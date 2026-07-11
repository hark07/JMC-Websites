import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import api from "../api/axios";

function ProgramDetails() {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await api.get(`/programs/slug/${slug}`);

        setProgram(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProgram();
  }, [slug]);

  if (!program) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold text-red-500">Program Not Found</h1>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-5">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 bg-[#082b4f] hover:bg-red-500 text-white px-5 py-3 rounded-lg"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="mb-10">
          <span className="bg-red-500 text-white px-4 py-2 rounded-full">
            {program.code}
          </span>

          <h1 className="text-5xl font-bold text-[#082b4f] mt-5">
            {program.title}
          </h1>

          <p className="text-gray-600 mt-4">{program.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#082b4f] mb-6">
              Program Information
            </h2>

            <p>
              <strong>Duration:</strong> {program.duration}
            </p>

            <p>
              <strong>Eligibility:</strong> {program.eligibility}
            </p>

            <p>
              <strong>Seats:</strong> {program.seats}
            </p>

            <p>
              <strong>Affiliation:</strong> {program.affiliation}
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#082b4f] mb-6">
              Objectives
            </h2>

            <ul className="list-disc ml-5 space-y-3">
              {program.objectives?.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgramDetails;
