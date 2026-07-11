import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logojmc.png";

// ============================
// Reusable Input Component
// ============================

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) => (
  <div className="flex flex-col gap-1">
    <label className="font-medium text-sm">
      {label}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

// ============================
// Reusable Section Title
// ============================

const SectionTitle = ({ title }) => (
  <div className="bg-blue-900 text-white font-bold uppercase px-4 py-2 rounded mb-4">
    {title}
  </div>
);

// ============================
// Initial Form Data
// ============================

const initialFormData = {
  // Personal Details
  fullName: "",
  nepaliName: "",
  dobAD: "",
  dobBS: "",
  gender: "",
  nationality: "",
  citizenshipNo: "",
  nationalId: "",
  bloodGroup: "",
  maritalStatus: "",
  religion: "",
  email: "",
  mobile: "",

  // Permanent Address
  permanentProvince: "",
  permanentDistrict: "",
  permanentMunicipality: "",
  permanentWard: "",
  permanentTole: "",

  // Temporary Address
  temporaryProvince: "",
  temporaryDistrict: "",
  temporaryMunicipality: "",
  temporaryWard: "",
  temporaryTole: "",

  // Parent Details
  fatherName: "",
  fatherOccupation: "",
  fatherMobile: "",
  motherName: "",
  motherOccupation: "",
  motherMobile: "",

  // Guardian
  guardianName: "",
  guardianRelation: "",
  guardianContact: "",

  // SEE
  seeSchool: "",
  seeBoard: "",
  seeYear: "",
  seeGPA: "",

  // +2
  plusTwoCollege: "",
  plusTwoBoard: "",
  plusTwoFaculty: "",
  plusTwoYear: "",
  plusTwoGPA: "",

  // Admission
  faculty: "",
  program: "",
  subjectGroup: "",
  academicYear: "",
  rollNo: "",
  registrationNo: "",

  // Declaration
  applicantSignature: "",
  declarationDate: "",

  // Office Use
  receivedBy: "",
  remarks: "",
  approvedBy: "",
  verification: "",
  officeSignature: "",
  officeDate: "",
};

// ============================
// Main Component
// ============================

const AdmissionForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [studentPhoto, setStudentPhoto] = useState(null);
  const [studentPreview, setStudentPreview] = useState("");

  const [documents, setDocuments] = useState({
    seeMarksheet: null,
    seeCharacter: null,
    plusTwoTranscript: null,
    plusTwoCharacter: null,
    migration: null,
    provisional: null,
    citizenship: null,
    passportPhoto: null,
    entranceScore: null,
    other: null,
  });

  // ============================
  // Handle Input Change
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // Student Photo Upload
  // ============================

  const handleStudentPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setStudentPhoto(file);
    setStudentPreview(URL.createObjectURL(file));

    (toast.success("Student photo uploaded."),
      {
        autoClose: 3000,
      });
  };

  // ============================
  // Document Upload
  // ============================

  const handleDocumentUpload = (e) => {
    const { name, files } = e.target;

    if (!files.length) return;

    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    toast.success(`${name} uploaded.`);
  };

  // ============================
  // Submit Form
  // ============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile || !formData.faculty) {
      (toast.error("Please fill all required fields."),
        {
          autoClose: 3000,
        });
      return;
    }

    toast.success("Admission Form Submitted Successfully!");
    console.log(formData);
    console.log(documents);
  };

  // ============================
  // Reset Form
  // ============================

  const handleReset = () => {
    setFormData(initialFormData);
    setStudentPhoto(null);
    setStudentPreview("");

    setDocuments({
      seeMarksheet: null,
      seeCharacter: null,
      plusTwoTranscript: null,
      plusTwoCharacter: null,
      migration: null,
      provisional: null,
      citizenship: null,
      passportPhoto: null,
      entranceScore: null,
      other: null,
    });

    (toast.info("Form Reset Successfully."),
      {
        autoClose: 3000,
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
      />

      <div className="bg-gray-100 min-h-screen py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto bg-white border shadow-lg"
        >
          {/* ================= HEADER ================= */}

          <div className="border-b p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex justify-center md:w-28">
                <img
                  src={logo}
                  alt="TU Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>

              {/* University Title */}
              <div className="flex-1 text-center order-first md:order-none">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black uppercase">
                  Tribhuvan University
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase mt-2 text-black">
                  Janjyoti Multiple Campus
                </h2>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mt-2">
                  Bachelor Level Admission Form
                </h3>
              </div>

              {/* Student Photo */}
              <div className="w-32 sm:w-36 md:w-40">
                <label htmlFor="studentPhoto" className="cursor-pointer">
                  <div className="border-2 h-40 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden">
                    {studentPreview ? (
                      <img
                        src={studentPreview}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-xs sm:text-sm px-2">
                        Student Photo
                        <br />
                        (Recent Passport Size)
                      </div>
                    )}
                  </div>
                </label>

                <input
                  id="studentPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleStudentPhoto}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* ========================================= */}
            {/* 1. PERSONAL DETAILS */}
            {/* ========================================= */}

            <SectionTitle title="1. Personal Details" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}

              <div className="space-y-4">
                <InputField
                  label="Full Name (In Capital Letters)"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Name in Nepali"
                  name="nepaliName"
                  value={formData.nepaliName}
                  onChange={handleChange}
                />

                <InputField
                  label="Date of Birth (A.D.)"
                  name="dobAD"
                  type="date"
                  value={formData.dobAD}
                  onChange={handleChange}
                />

                <div>
                  <label className="font-medium block mb-2">Gender</label>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />
                      Male
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        checked={formData.gender === "Other"}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                </div>

                <InputField
                  label="Nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                />

                <InputField
                  label="National ID No. (If Available)"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                />

                <div>
                  <label className="font-medium block mb-2">
                    Marital Status
                  </label>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Single"
                        checked={formData.maritalStatus === "Single"}
                        onChange={handleChange}
                      />
                      Single
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Married"
                        checked={formData.maritalStatus === "Married"}
                        onChange={handleChange}
                      />
                      Married
                    </label>
                  </div>
                </div>

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Right Column */}

              <div className="space-y-4">
                <InputField
                  label="Date of Birth (B.S.)"
                  name="dobBS"
                  value={formData.dobBS}
                  onChange={handleChange}
                />

                <InputField
                  label="Citizenship No."
                  name="citizenshipNo"
                  value={formData.citizenshipNo}
                  onChange={handleChange}
                />

                <InputField
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                />

                <InputField
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                />

                <InputField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              {/* ========================================= */}
              {/* 2. PERMANENT ADDRESS */}
              {/* ========================================= */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <SectionTitle title="2. Permanent Address" />

                  <div className="space-y-4">
                    <InputField
                      label="Province"
                      name="permanentProvince"
                      value={formData.permanentProvince}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="District"
                      name="permanentDistrict"
                      value={formData.permanentDistrict}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Municipality / Rural Municipality"
                      name="permanentMunicipality"
                      value={formData.permanentMunicipality}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Ward No."
                      name="permanentWard"
                      value={formData.permanentWard}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Tole / Village"
                      name="permanentTole"
                      value={formData.permanentTole}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* ========================================= */}
                {/* 3. TEMPORARY ADDRESS */}
                {/* ========================================= */}

                <div>
                  <SectionTitle title="3. Temporary Address" />

                  <div className="space-y-4">
                    <InputField
                      label="Province"
                      name="temporaryProvince"
                      value={formData.temporaryProvince}
                      onChange={handleChange}
                    />

                    <InputField
                      label="District"
                      name="temporaryDistrict"
                      value={formData.temporaryDistrict}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Municipality / Rural Municipality"
                      name="temporaryMunicipality"
                      value={formData.temporaryMunicipality}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Ward No."
                      name="temporaryWard"
                      value={formData.temporaryWard}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Tole / Village"
                      name="temporaryTole"
                      value={formData.temporaryTole}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {/* ========================================= */}
                {/* 4. PARENT / GUARDIAN DETAILS */}
                {/* ========================================= */}

                <SectionTitle title="4. Parent / Guardian Details" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Father Details */}

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                      Father's Details
                    </h3>

                    <InputField
                      label="Father's Full Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Occupation"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Mobile Number"
                      name="fatherMobile"
                      type="tel"
                      value={formData.fatherMobile}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mother Details */}

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2">
                      Mother's Details
                    </h3>

                    <InputField
                      label="Mother's Full Name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      label="Occupation"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Mobile Number"
                      name="motherMobile"
                      type="tel"
                      value={formData.motherMobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Guardian */}

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4">
                    Guardian Details (If Applicable)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField
                      label="Guardian Name"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Relationship"
                      name="guardianRelation"
                      value={formData.guardianRelation}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Contact Number"
                      name="guardianContact"
                      type="tel"
                      value={formData.guardianContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  {/* ========================================= */}
                  {/* 5. ACADEMIC INFORMATION */}
                  {/* ========================================= */}

                  <SectionTitle title="5. Academic Information" />

                  {/* SEE / SLC */}

                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4">
                      SEE / SLC Examination
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <InputField
                        label="School Name"
                        name="seeSchool"
                        value={formData.seeSchool}
                        onChange={handleChange}
                        required
                      />

                      <InputField
                        label="Board / University"
                        name="seeBoard"
                        value={formData.seeBoard}
                        onChange={handleChange}
                        required
                      />

                      <InputField
                        label="Passed Year"
                        name="seeYear"
                        value={formData.seeYear}
                        onChange={handleChange}
                      />

                      <InputField
                        label="GPA / Percentage"
                        name="seeGPA"
                        value={formData.seeGPA}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* +2 / Equivalent */}

                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4">
                      +2 / Intermediate / Equivalent
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      <InputField
                        label="College Name"
                        name="plusTwoCollege"
                        value={formData.plusTwoCollege}
                        onChange={handleChange}
                        required
                      />

                      <InputField
                        label="Board / University"
                        name="plusTwoBoard"
                        value={formData.plusTwoBoard}
                        onChange={handleChange}
                      />

                      <InputField
                        label="Faculty"
                        name="plusTwoFaculty"
                        value={formData.plusTwoFaculty}
                        onChange={handleChange}
                      />

                      <InputField
                        label="Passed Year"
                        name="plusTwoYear"
                        value={formData.plusTwoYear}
                        onChange={handleChange}
                      />

                      <InputField
                        label="GPA / Percentage"
                        name="plusTwoGPA"
                        value={formData.plusTwoGPA}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    {/* ========================================= */}
                    {/* 6. ADMISSION DETAILS */}
                    {/* ========================================= */}

                    <SectionTitle title="6. Admission Details" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="font-medium block mb-2">
                            Faculty
                            <span className="text-red-600 ml-1">*</span>
                          </label>

                          <select
                            name="faculty"
                            value={formData.faculty}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded px-3 py-2"
                          >
                            <option value="">Select Faculty</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Management">Management</option>
                            <option value="Education">Education</option>
                            <option value="Science">Science</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-medium block mb-2">
                            Program
                          </label>

                          <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded px-3 py-2"
                          >
                            <option value="">Select Program</option>
                            <option value="BCA">BCA</option>
                            <option value="BBS">BBS</option>
                            <option value="BA">BA</option>
                            <option value="B.Ed">B.Ed</option>
                            <option value="BSc">BSc</option>
                          </select>
                        </div>

                        <InputField
                          label="Subject Group"
                          name="subjectGroup"
                          value={formData.subjectGroup}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-4">
                        <InputField
                          label="Academic Year"
                          name="academicYear"
                          value={formData.academicYear}
                          onChange={handleChange}
                          placeholder="2083/2084"
                        />

                        <InputField
                          label="Campus Roll No."
                          name="rollNo"
                          value={formData.rollNo}
                          onChange={handleChange}
                        />

                        <InputField
                          label="TU Registration No."
                          name="registrationNo"
                          value={formData.registrationNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      {/* ========================================= */}
                      {/* 7. REQUIRED DOCUMENTS */}
                      {/* ========================================= */}

                      <SectionTitle title="7. Required Documents" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* SEE Marksheet */}
                        <div>
                          <label className="block font-medium mb-2">
                            SEE / SLC Marksheet
                          </label>

                          <input
                            type="file"
                            name="seeMarksheet"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.seeMarksheet && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.seeMarksheet.name}
                            </p>
                          )}
                        </div>

                        {/* SEE Character */}
                        <div>
                          <label className="block font-medium mb-2">
                            SEE / SLC Character Certificate
                          </label>

                          <input
                            type="file"
                            name="seeCharacter"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.seeCharacter && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.seeCharacter.name}
                            </p>
                          )}
                        </div>

                        {/* +2 Transcript */}
                        <div>
                          <label className="block font-medium mb-2">
                            +2 Transcript
                          </label>

                          <input
                            type="file"
                            name="plusTwoTranscript"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.plusTwoTranscript && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.plusTwoTranscript.name}
                            </p>
                          )}
                        </div>

                        {/* +2 Character */}
                        <div>
                          <label className="block font-medium mb-2">
                            +2 Character Certificate
                          </label>

                          <input
                            type="file"
                            name="plusTwoCharacter"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.plusTwoCharacter && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.plusTwoCharacter.name}
                            </p>
                          )}
                        </div>

                        {/* Migration */}
                        <div>
                          <label className="block font-medium mb-2">
                            Migration Certificate
                          </label>

                          <input
                            type="file"
                            name="migration"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.migration && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.migration.name}
                            </p>
                          )}
                        </div>

                        {/* Provisional */}
                        <div>
                          <label className="block font-medium mb-2">
                            Provisional Certificate
                          </label>

                          <input
                            type="file"
                            name="provisional"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.provisional && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.provisional.name}
                            </p>
                          )}
                        </div>

                        {/* Citizenship */}
                        <div>
                          <label className="block font-medium mb-2">
                            Citizenship Certificate
                          </label>

                          <input
                            type="file"
                            name="citizenship"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.citizenship && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.citizenship.name}
                            </p>
                          )}
                        </div>

                        {/* Passport Photo */}
                        <div>
                          <label className="block font-medium mb-2">
                            Passport Size Photo
                          </label>

                          <input
                            type="file"
                            name="passportPhoto"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.passportPhoto && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.passportPhoto.name}
                            </p>
                          )}
                        </div>

                        {/* Entrance Score */}
                        <div>
                          <label className="block font-medium mb-2">
                            Entrance Score Sheet
                          </label>

                          <input
                            type="file"
                            name="entranceScore"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.entranceScore && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.entranceScore.name}
                            </p>
                          )}
                        </div>

                        {/* Other */}
                        <div>
                          <label className="block font-medium mb-2">
                            Other Documents
                          </label>

                          <input
                            type="file"
                            name="other"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents.other && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents.other.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-8">
                        {/* ========================================= */}
                        {/* 8. DECLARATION */}
                        {/* ========================================= */}

                        <SectionTitle title="8. Declaration" />

                        <div className="border rounded-lg p-5 space-y-5">
                          <p className="text-justify leading-7">
                            I hereby declare that all the information provided
                            in this admission form is true and correct to the
                            best of my knowledge. I understand that if any
                            information is found to be false or misleading, my
                            admission may be cancelled by the campus at any
                            time.
                          </p>

                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              required
                              className="mt-1 h-5 w-5"
                            />

                            <span>I agree with the above declaration.</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                              label="Applicant Signature"
                              name="applicantSignature"
                              value={formData.applicantSignature}
                              onChange={handleChange}
                              required
                            />

                            <InputField
                              label="Date"
                              name="declarationDate"
                              type="date"
                              value={formData.declarationDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="mt-10"></div>

                        {/* ========================================= */}
                        {/* OFFICE USE ONLY */}
                        {/* ========================================= */}

                        <SectionTitle title="Office Use Only" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField
                            label="Received By"
                            name="receivedBy"
                            value={formData.receivedBy}
                            onChange={handleChange}
                          />

                          <InputField
                            label="Verified By"
                            name="verification"
                            value={formData.verification}
                            onChange={handleChange}
                          />

                          <InputField
                            label="Approved By"
                            name="approvedBy"
                            value={formData.approvedBy}
                            onChange={handleChange}
                          />

                          <InputField
                            label="Office Signature"
                            name="officeSignature"
                            value={formData.officeSignature}
                            onChange={handleChange}
                          />

                          <InputField
                            label="Office Date"
                            name="officeDate"
                            type="date"
                            value={formData.officeDate}
                            onChange={handleChange}
                          />

                          <div className="flex flex-col gap-1">
                            <label className="font-medium text-sm">
                              Remarks
                            </label>

                            <textarea
                              rows={5}
                              name="remarks"
                              value={formData.remarks}
                              onChange={handleChange}
                              className="border border-gray-400 rounded px-3 py-2 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
                            />
                          </div>
                        </div>

                        <div className="mt-10">
                          {/* ========================================= */}
                          {/* ACTION BUTTONS */}
                          {/* ========================================= */}

                          <div className="mt-10 flex flex-wrap justify-center gap-4 border-t pt-6">
                            {/* Submit */}

                            <button
                              type="submit"
                              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                            >
                              Submit Form
                            </button>

                            {/* Reset */}

                            <button
                              type="button"
                              onClick={handleReset}
                              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                            >
                              Reset Form
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
