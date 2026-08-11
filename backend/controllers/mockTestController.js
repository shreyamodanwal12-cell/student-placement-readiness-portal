const supabase = require("../config/supabase");

// Create Mock Test
const createMockTest = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      total_questions,
    } = req.body;

    if (!title || !duration || !total_questions) {
      return res.status(400).json({
        success: false,
        message: "Title, duration and total questions are required",
      });
    }

    const { data, error } = await supabase
      .from("mock_tests")
      .insert([
        {
          title,
          description,
          duration,
          total_questions,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Mock Test Created Successfully",
      test: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Get All Mock Tests
const getAllMockTests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mock_tests")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      tests: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// Get Mock Test By ID
const getMockTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("mock_tests")
      .select(`
        *,
        mock_questions (*)
      `)
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: "Mock Test not found",
      });
    }

    res.status(200).json({
      success: true,
      test: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Add Question to Mock Test
const addQuestion = async (req, res) => {
  try {
    const mock_test_id = req.params.mock_test_id || req.params.id;

console.log("MOCK TEST ID:", mock_test_id);
console.log("MOCK TEST ID:", mock_test_id);
    const {
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      marks,
    } = req.body;

    // Validation
    if (
      !question ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d ||
      !correct_answer
    ) {
      return res.status(400).json({
        success: false,
        message: "All question fields are required",
      });
    }

    // Check Mock Test Exists
   const { data: test, error: testError } = await supabase
  .from("mock_tests")
  .select("id, title")
  .eq("id", mock_test_id)
  .single();

console.log("TEST DATA:", test);
console.log("TEST ERROR:", testError);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Mock Test not found",
      });
    }

    // Validate correct answer
    const allowedAnswers = ["A", "B", "C", "D"];

    if (!allowedAnswers.includes(correct_answer.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Correct answer must be A, B, C or D",
      });
    }

    // Insert Question
    const { data, error } = await supabase
      .from("mock_questions")
      .insert([
        {
          mock_test_id: Number(mock_test_id),
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer: correct_answer.toUpperCase(),
          marks: marks || 1,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Question Added Successfully",
      question: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Submit Mock Test
const submitMockTest = async (req, res) => {
  try {
    const { mock_test_id } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers are required",
      });
    }

    // Get Student
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (studentError || !student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Get Questions
    const { data: questions, error: questionError } = await supabase
      .from("mock_questions")
      .select("*")
      .eq("mock_test_id", mock_test_id);

    if (questionError) {
      return res.status(400).json({
        success: false,
        message: questionError.message,
      });
    }

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this test",
      });
    }

    // Calculate Result
    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    questions.forEach((question) => {
      const submittedAnswer = answers.find(
        (answer) => Number(answer.question_id) === Number(question.id)
      );

      if (
        submittedAnswer &&
        submittedAnswer.answer?.toUpperCase() ===
          question.correct_answer.toUpperCase()
      ) {
        score += question.marks || 1;
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const totalMarks = questions.reduce(
      (total, question) => total + (question.marks || 1),
      0
    );

    const percentage =
      totalMarks > 0 ? ((score / totalMarks) * 100).toFixed(2) : 0;

    // Save Result
    const { data: result, error: resultError } = await supabase
      .from("mock_results")
      .insert([
        {
          student_id: student.id,
          mock_test_id: Number(mock_test_id),
          score,
          total_marks: totalMarks,
          correct_answers: correctAnswers,
          wrong_answers: wrongAnswers,
          percentage: Number(percentage),
        },
      ])
      .select();

    if (resultError) {
      return res.status(400).json({
        success: false,
        message: resultError.message,
      });
    }

    // Send Result
    res.status(201).json({
      success: true,
      message: "Mock Test Submitted Successfully",
      result: {
        score,
        total_marks: totalMarks,
        correct_answers: correctAnswers,
        wrong_answers: wrongAnswers,
        percentage: Number(percentage),
        result_id: result[0].id,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Mock Results (Admin)
// Get All Mock Results (Admin)
const getAllMockResults = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("mock_results")
      .select(`
        id,
        score,
        total_marks,
        correct_answers,
        wrong_answers,
        percentage,
        submitted_at,
        students (
          id,
          user_id,
          college_roll,
          branch,
          course,
          users (
            id,
            full_name,
            email
          )
        ),
        mock_tests (
          id,
          title,
          description
        )
      `)
      .order("submitted_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      results: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createMockTest,
  getAllMockTests,
  getMockTestById,
  addQuestion,
  submitMockTest,
  getAllMockResults,

};