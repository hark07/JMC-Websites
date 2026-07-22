import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logojmc.png";
import API from "../api/axios";

// =========================================
// INPUT COMPONENT
// =========================================

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) => {
  return (
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
};

// =========================================
// SECTION TITLE
// =========================================

const SectionTitle = ({ title }) => {
  return (
    <div className="bg-blue-900 text-white font-bold uppercase px-4 py-2 rounded mb-4">
      {title}
    </div>
  );
};

// =========================================
// INITIAL FORM DATA
// =========================================

const initialFormData = {
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

  permanentProvince: "",
  permanentDistrict: "",
  permanentMunicipality: "",
  permanentWard: "",
  permanentTole: "",

  temporaryProvince: "",
  temporaryDistrict: "",
  temporaryMunicipality: "",
  temporaryWard: "",
  temporaryTole: "",

  fatherName: "",
  fatherOccupation: "",
  fatherMobile: "",

  motherName: "",
  motherOccupation: "",
  motherMobile: "",

  guardianName: "",
  guardianRelation: "",
  guardianContact: "",

  seeSchool: "",
  seeBoard: "",
  seeYear: "",
  seeGPA: "",

  plusTwoCollege: "",
  plusTwoBoard: "",
  plusTwoFaculty: "",
  plusTwoYear: "",
  plusTwoGPA: "",

  faculty: "",
  program: "",
  subjectGroup: "",
  academicYear: "",
  rollNo: "",
  registrationNo: "",

  applicantSignature: "",
  declarationDate: "",

  receivedBy: "",
  verification: "",
  approvedBy: "",
  remarks: "",
  officeSignature: "",
  officeDate: "",
};

// =========================================
// MAIN COMPONENT
// =========================================

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

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // STUDENT PHOTO
  // =========================================

  const handleStudentPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setStudentPhoto(file);
    setStudentPreview(URL.createObjectURL(file));

    toast.success("Student photo uploaded successfully");
  };

  // =========================================
  // DOCUMENT UPLOAD
  // =========================================

  const handleDocumentUpload = (e) => {
    const { name, files } = e.target;

    if (!files?.length) return;

    setDocuments((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    toast.success(`${name} uploaded`);
  };

  // =========================================
  // RESET FORM
  // =========================================

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

    toast.info("Form reset successfully");
  };

  // =========================================
  // SUBMIT FORM
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile || !formData.faculty) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (studentPhoto) {
        form.append("studentPhoto", studentPhoto);
      }

      Object.values(documents).forEach((file) => {
        if (file) {
          form.append("documents", file);
        }
      });

      const res = await API.post("/admissions", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        res.data.message || "Admission Form Submitted Successfully",
      );

      handleReset();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to submit form");
    }
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
      />

      <div className="bg-gray-100 min-h-screen py-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto bg-white border shadow-lg"
        >
          {/* ========================================= */}
          {/* HEADER */}
          {/* ========================================= */}

          <div className="border-b p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}

              <div className="flex justify-center md:w-28">
                <img
                  src={logo}
                  alt="JMC Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>

              {/* Title */}

              <div className="flex-1 text-center order-first md:order-none">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase">
                  Tribhuvan University
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase mt-2">
                  Janjyoti Multiple Campus
                </h2>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mt-2">
                  Bachelor Level Admission Form
                </h3>
              </div>

              {/* Student Photo */}

              <div className="w-32 sm:w-36 md:w-40">
                <label htmlFor="studentPhoto" className="cursor-pointer">
                  <div className="border-2 border-gray-400 h-40 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden">
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
              {/* LEFT SIDE */}

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

                  <div className="flex flex-wrap gap-6">
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
                  label="National ID No."
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

              {/* RIGHT SIDE */}

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

              {/* ========================================= */}
              {/* 4. PARENT / GUARDIAN DETAILS */}
              {/* ========================================= */}

              <div className="mt-8">
                <SectionTitle title="4. Parent / Guardian Details" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Father */}

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

                  {/* Mother */}

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
              </div>

              {/* ========================================= */}
              {/* 5. ACADEMIC INFORMATION */}
              {/* ========================================= */}

              <div className="mt-8">
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

                {/* +2 */}

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
                    {/* Left Side */}

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
                          className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
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
                          className="w-full border border-gray-400 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
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

                    {/* Right Side */}

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

                  {/* ========================================= */}
                  {/* 7. REQUIRED DOCUMENTS */}
                  {/* ========================================= */}

                  <div className="mt-8">
                    <SectionTitle title="7. Required Documents" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.keys(documents).map((key) => (
                        <div key={key}>
                          <label className="block font-medium mb-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </label>

                          <input
                            type="file"
                            name={key}
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={handleDocumentUpload}
                            className="w-full border rounded p-2"
                          />

                          {documents[key] && (
                            <p className="text-green-600 text-sm mt-2">
                              {documents[key].name}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* 8. DECLARATION */}
                  {/* ========================================= */}

                  <div className="mt-8">
                    <SectionTitle title="8. Declaration" />

                    <div className="border rounded-lg p-5 space-y-5">
                      <p className="text-justify leading-7">
                        I hereby declare that all information provided in this
                        admission form is true and correct to the best of my
                        knowledge. I understand that any false information may
                        result in cancellation of my admission.
                      </p>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 h-5 w-5"
                        />

                        <span>
                          I agree with the above declaration and terms.
                        </span>
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
                          type="date"
                          name="declarationDate"
                          value={formData.declarationDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* BUTTONS */}
                  {/* ========================================= */}

                  <div className="mt-10 border-t pt-6">
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition"
                      >
                        Submit Form
                      </button>

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
        </form>
      </div>
    </>
  );
};

export default AdmissionForm;
