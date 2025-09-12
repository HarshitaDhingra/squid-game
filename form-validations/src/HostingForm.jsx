import React, { useState } from "react";

const HostingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    guests: "",
    description: "",
    amenities: [],
    price: "",
  });

  const [errors, setErrors] = useState({});

  // available amenities
  const amenityOptions = ["WiFi", "AC", "Parking", "Pool", "TV"];

  // Validation logic
  const validate = (fieldValues = formData) => {
    let temp = { ...errors };

    // Title: max 30 characters
    if ("title" in fieldValues) {
      if (!fieldValues.title) {
        temp.title = "Title is required";
      } else if (fieldValues.title.length > 30) {
        temp.title = "Exceeding 30 characters limit";
      } else {
        temp.title = "";
      }
    }

    // Guests: 1–20
    if ("guests" in fieldValues) {
      const g = Number(fieldValues.guests);
      if (!g) {
        temp.guests = "Number of guests is required";
      } else if (g < 1 || g > 20) {
        temp.guests = "Limit exceeded. Range is 1 to 20";
      } else {
        temp.guests = "";
      }
    }

    // Description: 30–200 characters
    if ("description" in fieldValues) {
      if (!fieldValues.description) {
        temp.description = "Description is required";
      } else if (
        fieldValues.description.length < 30 ||
        fieldValues.description.length > 200
      ) {
        temp.description = "Should be between 30 and 200 characters";
      } else {
        temp.description = "";
      }
    }

    // Amenities: at least 1
    if ("amenities" in fieldValues) {
      if (!fieldValues.amenities.length) {
        temp.amenities = "At least one amenity should be selected";
      } else {
        temp.amenities = "";
      }
    }

    // Price: 50–1000
    if ("price" in fieldValues) {
      const p = Number(fieldValues.price);
      if (!p) {
        temp.price = "Price is required";
      } else if (p < 50 || p > 1000) {
        temp.price = "Should be between $50 and $1000";
      } else {
        temp.price = "";
      }
    }

    setErrors(temp);

    // returns true if no errors
    return Object.values(temp).every((x) => x === "");
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (name === "amenities") {
      newValue = checked
        ? [...formData.amenities, value]
        : formData.amenities.filter((a) => a !== value);
    }

    const updatedData = {
      ...formData,
      [name]: newValue,
    };

    setFormData(updatedData);
    validate({ [name]: newValue }); // real-time validation
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully ✅");
      console.log(formData);
      // send data to backend here
    } else {
      alert("Please fix the errors ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      {/* Title */}
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>

      {/* Guests */}
      <div>
        <label>Number of Guests:</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
        />
        {errors.guests && <p style={{ color: "red" }}>{errors.guests}</p>}
      </div>

      {/* Description */}
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      {/* Amenities */}
      <div>
        <label>Amenities:</label>
        {amenityOptions.map((a) => (
          <div key={a}>
            <input
              type="checkbox"
              name="amenities"
              value={a}
              checked={formData.amenities.includes(a)}
              onChange={handleChange}
            />
            {a}
          </div>
        ))}
        {errors.amenities && <p style={{ color: "red" }}>{errors.amenities}</p>}
      </div>

      {/* Price */}
      <div>
        <label>Price ($):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default HostingForm;
