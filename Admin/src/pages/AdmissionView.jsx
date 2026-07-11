import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import logo from "../assets/logojmc.png";

import { hasPermission } from "../utils/hasPermission";
import { PERMISSIONS } from "../constants/permissions";

// ===============================
// Reusable Section Title
// ===============================

const SectionTitle = ({ title }) => (
  <div className="bg-blue-900 text-white font-bold uppercase px-4 py-2 rounded mb-5 text-sm sm:text-base">
    {title}
  </div>
);

// ===============================
// Read Only Input
// ===============================

const InputField = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <label className="font-semibold text-sm text-gray-700">{label}</label>

    <input
      value={value ?? ""}
      readOnly
      className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-100 outline-none text-sm"
    />
  </div>
);

// ===============================
// Main Component
// ===============================

const AdmissionView = () => {
  const { id } = useParams();

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // Fetch Admission Data
  // ===============================

  const getAdmission = async () => {
    try {
      const res = await API.get(`/admissions/${id}`);
      setAdmission(res.data.data);
    } catch (error) {
      console.error(error);
      setError("Admission not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmission();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-lg sm:text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-6 lg:py-8 px-3 sm:px-5">
      <div className="max-w-7xl mx-auto bg-white shadow-lg border rounded-lg p-4 sm:p-6 lg:p-8">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 border-b pb-6">
          {/* Logo */}

          <div className="flex justify-center lg:justify-start">
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>

          {/* Title */}

          <div className="flex-1 text-center px-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase">
              Tribhuvan University
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase mt-2">
              Janjyoti Multiple Campus
            </h2>

            <h3 className="text-base sm:text-lg lg:text-xl font-bold uppercase mt-2">
              Bachelor Level Admission Form
            </h3>
          </div>

          {/* Student Photo */}

          <div className="flex justify-center">
            {admission.studentPhoto ? (
              <img
                src={admission.studentPhoto}
                alt="Student"
                className="w-32 h-40 sm:w-40 sm:h-52 object-cover border-2"
              />
            ) : (
              <div className="w-32 h-40 sm:w-40 sm:h-52 border-2 flex items-center justify-center text-sm text-gray-500">
                Student Photo
              </div>
            )}
          </div>
        </div>

        {/* ================= CONTENT START ================= */}

        <div className="mt-8">
          {/* ================= ADDRESS DETAILS ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ================= PERMANENT ADDRESS ================= */}

            <div>
              <SectionTitle title="2. Permanent Address" />

              <div className="space-y-4">
                <InputField
                  label="Province"
                  value={admission.permanentAddress?.province}
                />

                <InputField
                  label="District"
                  value={admission.permanentAddress?.district}
                />

                <InputField
                  label="Municipality / Rural Municipality"
                  value={admission.permanentAddress?.municipality}
                />

                <InputField
                  label="Ward No."
                  value={admission.permanentAddress?.ward}
                />

                <InputField
                  label="Tole / Village"
                  value={admission.permanentAddress?.tole}
                />
              </div>
            </div>

            {/* ================= TEMPORARY ADDRESS ================= */}

            <div>
              <SectionTitle title="3. Temporary Address" />

              <div className="space-y-4">
                <InputField
                  label="Province"
                  value={admission.temporaryAddress?.province}
                />

                <InputField
                  label="District"
                  value={admission.temporaryAddress?.district}
                />

                <InputField
                  label="Municipality / Rural Municipality"
                  value={admission.temporaryAddress?.municipality}
                />

                <InputField
                  label="Ward No."
                  value={admission.temporaryAddress?.ward}
                />

                <InputField
                  label="Tole / Village"
                  value={admission.temporaryAddress?.tole}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= PARENT / GUARDIAN DETAILS ================= */}

        <div className="mt-8">
          {/* ================= PARENT / GUARDIAN DETAILS ================= */}

          <SectionTitle title="4. Parent / Guardian Details" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ================= FATHER DETAILS ================= */}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                Father's Details
              </h3>

              <InputField
                label="Father's Full Name"
                value={admission.father?.name}
              />

              <InputField
                label="Occupation"
                value={admission.father?.occupation}
              />

              <InputField
                label="Mobile Number"
                value={admission.father?.mobile}
              />
            </div>

            {/* ================= MOTHER DETAILS ================= */}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                Mother's Details
              </h3>

              <InputField
                label="Mother's Full Name"
                value={admission.mother?.name}
              />

              <InputField
                label="Occupation"
                value={admission.mother?.occupation}
              />

              <InputField
                label="Mobile Number"
                value={admission.mother?.mobile}
              />
            </div>
          </div>

          {/* ================= GUARDIAN DETAILS ================= */}

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-5">
              Guardian Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Guardian Name"
                value={admission.guardian?.name}
              />

              <InputField
                label="Relationship"
                value={admission.guardian?.relation}
              />

              <InputField
                label="Contact Number"
                value={admission.guardian?.contact}
              />
            </div>
          </div>
        </div>

        {/* ================= ACADEMIC INFORMATION ================= */}

        <div className="mt-8">
          {/* ================= ACADEMIC INFORMATION ================= */}

          <SectionTitle title="5. Academic Information" />

          {/* ================= SEE DETAILS ================= */}

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-5">
              SEE / SLC Examination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <InputField
                label="School Name"
                value={admission.academic?.see?.school}
              />

              <InputField
                label="Board / University"
                value={admission.academic?.see?.board}
              />

              <InputField
                label="Passed Year"
                value={admission.academic?.see?.year}
              />

              <InputField
                label="GPA / Percentage"
                value={admission.academic?.see?.gpa}
              />
            </div>
          </div>

          {/* ================= PLUS TWO DETAILS ================= */}

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-5">
              +2 / Intermediate / Equivalent
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
              <InputField
                label="College Name"
                value={admission.academic?.plusTwo?.college}
              />

              <InputField
                label="Board / University"
                value={admission.academic?.plusTwo?.board}
              />

              <InputField
                label="Faculty"
                value={admission.academic?.plusTwo?.faculty}
              />

              <InputField
                label="Passed Year"
                value={admission.academic?.plusTwo?.year}
              />

              <InputField
                label="GPA / Percentage"
                value={admission.academic?.plusTwo?.gpa}
              />
            </div>
          </div>
        </div>

        {/* ================= ADMISSION DETAILS ================= */}

        <div className="mt-8">
          {/* ================= ADMISSION DETAILS ================= */}

          <SectionTitle title="6. Admission Details" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField label="Faculty" value={admission.admission?.faculty} />

            <InputField label="Program" value={admission.admission?.program} />

            <InputField
              label="Subject Group"
              value={admission.admission?.subjectGroup}
            />

            <InputField
              label="Academic Year"
              value={admission.admission?.academicYear}
            />

            <InputField
              label="Campus Roll No."
              value={admission.admission?.rollNo}
            />

            <InputField
              label="TU Registration No."
              value={admission.admission?.registrationNo}
            />
          </div>
        </div>

        {/* ================= REQUIRED DOCUMENTS ================= */}

        <div className="mt-8">
          {/* ================= REQUIRED DOCUMENTS ================= */}

          <SectionTitle title="7. Required Documents" />

          <div className="space-y-4">
            {admission.documents && admission.documents.length > 0 ? (
              admission.documents.map((doc, index) => (
                <div
                  key={doc._id || index}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {doc.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Document {index + 1}
                    </p>
                  </div>

                  {hasPermission(PERMISSIONS.ADMISSION_READ) && (
                    <a
                      href={doc.url || doc}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded text-sm text-center w-full sm:w-auto"
                    >
                      View File
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="border p-5 text-center text-gray-500 rounded">
                No Documents Uploaded
              </div>
            )}
          </div>
        </div>

        {/* ================= DECLARATION ================= */}

        <div className="mt-8">
          {/* ================= DECLARATION ================= */}

          <SectionTitle title="8. Declaration" />

          <div className="border rounded-lg p-4 sm:p-5 space-y-5">
            <p className="text-justify leading-7 text-gray-700 text-sm sm:text-base">
              I hereby declare that all the information provided in this
              admission form is true and correct to the best of my knowledge. I
              understand that if any information is found to be false or
              misleading, my admission may be cancelled by the campus at any
              time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Applicant Signature"
                value={admission.declaration?.signature}
              />

              <InputField
                label="Declaration Date"
                value={admission.declaration?.date}
              />
            </div>
          </div>
        </div>

        {/* ================= OFFICE USE ONLY ================= */}

        <SectionTitle title="Office Use Only" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField label="Received By" value={admission.receivedBy} />

          <InputField label="Verified By" value={admission.verification} />

          <InputField label="Approved By" value={admission.approvedBy} />

          <InputField
            label="Office Signature"
            value={admission.officeSignature}
          />

          <InputField label="Office Date" value={admission.officeDate} />
        </div>

        <div className="mt-6">
          <label className="font-semibold text-sm text-gray-700">Remarks</label>

          <textarea
            value={admission.remarks || ""}
            readOnly
            rows="5"
            className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-100 mt-2 resize-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default AdmissionView;
