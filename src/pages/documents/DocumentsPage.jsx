import { useEffect, useState } from "react";
import api from "../../api/api";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    document_name: "",
    document_type: "",
    document: null,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  // GET DOCUMENTS
  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/documents");

      console.log("DOCUMENTS RESPONSE:", response.data);

      setDocuments(response.data.documents || []);
    } catch (error) {
      console.log(
        "DOCUMENTS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FILE CHANGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      document: file,
    }));
  };

  // ADD / UPDATE DOCUMENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      if (isEditing) {
        // PUT
        const updateData = {
          document_name: formData.document_name,
          document_type: formData.document_type,
        };

        // Agar edit ke time new PDF select kiya hai
        // to abhi backend PUT JSON accept karta hai.
        // Isliye existing file ko preserve karenge.
        const response = await api.put(
          `/documents/${editingId}`,
          updateData
        );

        console.log("UPDATE DOCUMENT:", response.data);

        alert("Document Updated Successfully");
      } else {
        // POST using FormData
        if (!formData.document) {
          alert("Please select a PDF document");
          return;
        }

        const data = new FormData();

        data.append(
          "document_name",
          formData.document_name
        );

        data.append(
          "document_type",
          formData.document_type
        );

        data.append(
          "document",
          formData.document
        );

        const response = await api.post(
          "/documents",
          data
        );

        console.log("ADD DOCUMENT:", response.data);

        alert("Document Uploaded Successfully");
      }

      resetForm();
      fetchDocuments();
    } catch (error) {
      console.log(
        "DOCUMENT SAVE ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Document operation failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // EDIT
  const handleEdit = (document) => {
    setIsEditing(true);
    setEditingId(document.id);

    setFormData({
      document_name: document.document_name || "",
      document_type: document.document_type || "",
      document: null,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/documents/${id}`
      );

      console.log("DELETE DOCUMENT:", response.data);

      alert("Document Deleted Successfully");

      fetchDocuments();
    } catch (error) {
      console.log(
        "DELETE DOCUMENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Document delete failed"
      );
    }
  };

  // RESET
  const resetForm = () => {
    setFormData({
      document_name: "",
      document_type: "",
      document: null,
    });

    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
          Documents
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-950">
          My Documents
        </h1>

        <p className="mt-2 text-slate-600">
          Upload and manage your placement-related documents.
        </p>
      </div>

      {/* FORM */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        <h2 className="text-xl font-semibold text-slate-950">
          {isEditing
            ? "Update Document"
            : "Upload Document"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          {/* DOCUMENT NAME */}
          <input
            type="text"
            name="document_name"
            value={formData.document_name}
            onChange={handleChange}
            placeholder="Document Name"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500"
          />

          {/* DOCUMENT TYPE */}
          <input
            type="text"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            placeholder="Document Type (e.g. Marksheet, Certificate)"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-500"
          />

          {/* FILE */}
          {!isEditing && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select PDF
              </label>

              <input
                type="file"
                name="document"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
              />

              {formData.document && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected: {formData.document.name}
                </p>
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              type="submit"
              disabled={uploading}
              className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading
                ? "Uploading..."
                : isEditing
                ? "Update Document"
                : "Upload Document"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      </div>

      {/* DOCUMENT LIST */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        <h2 className="text-xl font-semibold text-slate-950">
          Uploaded Documents
        </h2>

        {loading ? (
          <p className="mt-6 text-slate-500">
            Loading documents...
          </p>
        ) : documents.length === 0 ? (
          <p className="mt-6 text-slate-500">
            No documents uploaded yet.
          </p>
        ) : (
          <div className="mt-6 space-y-4">

            {documents.map((document) => (
              <div
                key={document.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"
              >

                {/* INFO */}
                <div>
                  <h3 className="font-semibold text-slate-950">
                    {document.document_name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Type:{" "}
                    {document.document_type ||
                      "Not specified"}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2">

                  {/* OPEN */}
                  <a
                    href={`http://localhost:5000${document.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                  >
                    Open
                  </a>

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(document)
                    }
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(document.id)
                    }
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentsPage;