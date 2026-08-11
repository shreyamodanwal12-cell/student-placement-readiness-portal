const bcrypt = require("bcrypt");
const supabase = require("../config/supabase");

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          full_name: "Placement Coordinator",
          email: "admin@college.com",
          password: hashedPassword,
          role: "admin",
        },
      ])
      .select();

    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log("✅ Admin Created Successfully");
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}

createAdmin();