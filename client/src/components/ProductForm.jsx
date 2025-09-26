import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .typeError("Price must be a number"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .typeError("Quantity must be a number"),
  category: yup.string().required("Category is required"),
});

const ProductForm = ({ initialData, onSubmit, submitText = "Submit", loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      price: "",
      quantity: "",
      category: "",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label={`${submitText} product form`}>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="error" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price")}
          aria-invalid={errors.price ? "true" : "false"}
        />
        {errors.price && (
          <p className="error" role="alert">
            {errors.price.message}
          </p>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          {...register("quantity")}
          aria-invalid={errors.quantity ? "true" : "false"}
        />
        {errors.quantity && (
          <p className="error" role="alert">
            {errors.quantity.message}
          </p>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          {...register("category")}
          aria-invalid={errors.category ? "true" : "false"}
        />
        {errors.category && (
          <p className="error" role="alert">
            {errors.category.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="form-button"
        disabled={loading}
        aria-label={submitText}
      >
        {loading ? "Submitting..." : submitText}
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  loading: PropTypes.bool,
};

export default ProductForm;