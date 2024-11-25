import React, { useState } from "react";

const FormComponent = () => {
  // State for the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: {
      mobile: "",
      email: "",
    },
    socialProfiles: {
      linkedIn: "",
      github: "",
    },
    experience: [],
    education: [],
    skills: [], // Change skills to an array
    certifications: [], // Certifications as an array
  });

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle change for Skills (split by commas)
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
    }));
  };

  // Add certification entry
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { certificateName: "", certificateLink: "" }],
    }));
  };

  // Update certification entry
  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }));
  };

  // Remove certification entry
  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      certifications: updatedCertifications,
    }));
  };

  // Add experience entry
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", description: "", startDate: "", endDate: "", currentlyWorking: false }],
    }));
  };

  // Update experience entry
  const updateExperience = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  // Handle change for the currently working checkbox
  const handleCurrentlyWorkingChange = (index, e) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index].currentlyWorking = e.target.checked;

    if (e.target.checked) {
      updatedExperience[index].endDate = "Present"; // Set "Present" when currently working is checked
    } else {
      updatedExperience[index].endDate = ""; // Clear endDate if not currently working
    }

    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  // Remove experience entry
  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  // Add education entry
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", description: "", startDate: "", endDate: "", currentlyStudying: false }],
    }));
  };

  // Update education entry
  const updateEducation = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  // Handle change for the currently studying checkbox
  const handleCurrentlyStudyingChange = (index, e) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index].currentlyStudying = e.target.checked;

    if (e.target.checked) {
      updatedEducation[index].endDate = "Studying"; // Set "Studying" when currently studying is checked
    } else {
      updatedEducation[index].endDate = ""; // Clear endDate if not currently studying
    }

    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  // Remove education entry
  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  // Handle date change for experience or education
  const handleDateChange = (index, field, e, type) => {
    const updatedData = type === "experience" ? [...formData.experience] : [...formData.education];
    updatedData[index][field] = e.target.value;

    if (type === "experience") {
      setFormData((prev) => ({
        ...prev,
        experience: updatedData,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        education: updatedData,
      }));
    }
  };

  // Form submit (for now just log the form data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-3 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Resume Builder</h2>

      <h3 className="text-xl font-semibold text-gray-700">Contact Details</h3>
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="contact.mobile"
          value={formData.contact.mobile}
          onChange={handleChange}
          placeholder="Mobile No"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="contact.email"
          value={formData.contact.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Social Profiles */}
      <h3 className="text-xl font-semibold text-gray-700">Social Profiles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="url"
          name="socialProfiles.linkedIn"
          value={formData.socialProfiles.linkedIn}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="socialProfiles.github"
          value={formData.socialProfiles.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Experience Details */}
      <h3 className="text-xl font-semibold text-gray-700">Experience</h3>
      {formData.experience.map((exp, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            type="text"
            value={exp.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            placeholder="Company Name"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={exp.role}
            onChange={(e) => updateExperience(index, "role", e.target.value)}
            placeholder="Role"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(index, "description", e.target.value)}
            placeholder="Description (max 500 words)"
            maxLength="500"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="date"
              value={exp.startDate}
              onChange={(e) => handleDateChange(index, "startDate", e, "experience")}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={exp.endDate}
              onChange={(e) => handleDateChange(index, "endDate", e, "experience")}
              disabled={exp.currentlyWorking}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={exp.currentlyWorking}
              onChange={(e) => handleCurrentlyWorkingChange(index, e)}
              className="mr-2"
            />
            <label>Currently Working</label>
          </div>
          <button type="button" onClick={() => removeExperience(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
            Remove Experience
          </button>
        </div>
      ))}
      <button type="button" onClick={addExperience} className="mt-4 p-2 bg-green-500 text-white rounded-md">
        Add Experience
      </button>

      {/* Education Details */}
      <h3 className="text-xl font-semibold text-gray-700">Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            type="text"
            value={edu.school}
            onChange={(e) => updateEducation(index, "school", e.target.value)}
            placeholder="School/University"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
            placeholder="Degree"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={edu.description}
            onChange={(e) => updateEducation(index, "description", e.target.value)}
            placeholder="Description (max 500 words)"
            maxLength="500"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) => handleDateChange(index, "startDate", e, "education")}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={edu.endDate}
              onChange={(e) => handleDateChange(index, "endDate", e, "education")}
              disabled={edu.currentlyStudying}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={edu.currentlyStudying}
              onChange={(e) => handleCurrentlyStudyingChange(index, e)}
              className="mr-2"
            />
            <label>Currently Studying</label>
          </div>
          <button type="button" onClick={() => removeEducation(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
            Remove Education
          </button>
        </div>
      ))}
      <button type="button" onClick={addEducation} className="mt-4 p-2 bg-green-500 text-white rounded-md">
        Add Education
      </button>

      {/* Skills */}
      <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
      <input
        type="text"
        value={formData.skills.join(", ")}
        onChange={handleSkillsChange}
        placeholder="Enter skills separated by commas"
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Certifications */}
      <h3 className="text-xl font-semibold text-gray-700">Certifications</h3>
      {formData.certifications.map((cert, index) => (
        <div key={index} className="flex flex-col gap-2">
          <input
            type="text"
            value={cert.certificateName}
            onChange={(e) => updateCertification(index, "certificateName", e.target.value)}
            placeholder="Certificate Name"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={cert.certificateLink}
            onChange={(e) => updateCertification(index, "certificateLink", e.target.value)}
            placeholder="Certificate Link"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={() => removeCertification(index)} className="mt-2 p-2 bg-red-500 text-white rounded-md">
            Remove Certification
          </button>
        </div>
      ))}
      {/* Add Certification Button */}
      <button type="button" onClick={addCertification} className="mt-4 p-2 bg-green-500 text-white rounded-md">
        Add Certification
      </button>

      {/* Submit Button */}
      <button type="submit" className="mt-6 p-3 bg-blue-500 text-white rounded-md w-full">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
