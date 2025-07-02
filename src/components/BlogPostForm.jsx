import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import RichTextEditor from "./RichTextEditor";

export default function BlogPostForm() {

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            headerImage: "",
            status: "draft",
            publishedAt: "",
            tags: "",
        },
    });

    // Watch content and excerpt for word count
    const content = watch("content");
    const excerpt = watch("excerpt");
    const titleValue = watch("title");

    const [imagePreviews, setImagePreviews] = useState([]);
    const [wordCount, setWordCount] = useState({ content: 0, excerpt: 0 });



    const slugify = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
            .replace(/\s+/g, "-") // collapse whitespace and replace by -
            .replace(/-+/g, "-"); // collapse dashes




    useEffect(() => {
        const generatedSlug = slugify(titleValue || "");
        setValue("slug", generatedSlug);
    }, [titleValue, setValue]);

    // 🔁 Autosave Draft to LocalStorage
    useEffect(() => {
        const savedDraft = localStorage.getItem("blogDraft");
        if (savedDraft) {
            reset(JSON.parse(savedDraft));
        }
    }, [reset]);

    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("blogDraft", JSON.stringify(value));
            setWordCount({
                content: value.content?.split(/\s+/).filter(Boolean).length || 0,
                excerpt: value.excerpt?.split(/\s+/).filter(Boolean).length || 0,
            });
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // 🖼️ Handle Image Previews
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagePreviews(files.map(file => URL.createObjectURL(file)));
    };

    
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");  // <--- Add this here

            if (!token) {
                alert("Please login to submit a blog post.");
                return;
            }

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("slug", data.slug);
            formData.append("content", data.content);
            formData.append("excerpt", data.excerpt);
            formData.append("status", data.status);
            formData.append("publishedAt", data.publishedAt);
            formData.append("tags", data.tags);

            if (data.headerImage && data.headerImage.length > 0) {
                for (let i = 0; i < data.headerImage.length; i++) {
                    formData.append("headerImage", data.headerImage[i]);
                }
            }

            await axios.post("http://localhost:5000/api/admin/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,   // Use token here
                },
            });

            alert("Blog post submitted successfully!");
            localStorage.removeItem("blogDraft");
            reset();
            setImagePreviews([]);
        } catch (error) {
            console.error("Error submitting blog post:", error);
            alert("Failed to submit blog post");
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-6xl mx-auto p-4 pl-6 bg-white shadow-md  space-y-6"
        >
            <h1 className="text-2xl font-normal text-center mb-8 mt-2">POST BLOG</h1>
            <div>
                <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                <input
                    id="title"
                    {...register("title", { required: "Title is required" })}
                    placeholder="Enter blog post title"
                    className="mt-1 block w-full border border-gray-300 px-4 py-2"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="slug" className="block font-medium text-gray-700">Slug</label>
                <input
                    id="slug"
                    {...register("slug", {
                        required: "Slug is required",
                        pattern: {
                            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                            message: "Slug must be URL-friendly (lowercase, hyphens only)",
                        }
                    })}
                    placeholder="url-friendly-slug"
                    className="mt-1 block w-full border border-gray-300  px-4 py-2"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
                <label htmlFor="excerpt" className="block font-medium text-gray-700">Excerpt</label>
                <textarea
                    id="excerpt"
                    {...register("excerpt", {
                        required: "Excerpt is required",
                        maxLength: { value: 250, message: "Max 250 characters" }
                    })}
                    placeholder="Short summary (1-2 sentences)"
                    className="mt-1 block w-full border border-gray-300  px-4 py-2"
                />
                <p className="text-sm text-gray-500">Words : {wordCount.excerpt}</p>
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <Controller
                name="content"
                control={control}
                rules={{
                    required: "Content is required",
                    validate: (value) =>
                        value.replace(/<[^>]*>/g, "").trim().length >= 100 ||
                        "Content must be at least 100 characters (excluding HTML)",
                }}
                render={({ field }) => (
                    <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <p className="text-sm text-gray-500">Words : {wordCount.content}</p>
            {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}


            <div>
                <label htmlFor="tags" className="block font-medium text-gray-700">Tags (comma-separated)</label>
                <input
                    id="tags"
                    {...register("tags")}
                    placeholder="e.g., react, blog, node"
                    className="mt-1 block w-full border border-gray-300  px-4 py-2"
                />
            </div>

            <div>
                <label htmlFor="headerImage" className="block font-medium text-gray-700">Upload Image</label>
                <input
                    id="headerImage"
                    type="file"
                    accept="image/*"
                    {...register("headerImage")}
                    onChange={handleImageChange}
                    className="mt-1 block w-full"
                />

                <div className="flex gap-2 mt-2 flex-wrap">
                    {imagePreviews.map((src, index) => (
                        <img key={index} src={src} alt={`preview-${index}`} className="w-24 h-24 object-cover " />
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="status" className="block font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    {...register("status")}
                    className="mt-1 block w-full border border-gray-300  px-4 py-2"
                >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div>
                <label htmlFor="publishedAt" className="block font-medium text-gray-700">Published Date</label>
                <input
                    id="publishedAt"
                    type="date"
                    {...register("publishedAt")}
                    className="mt-1 block w-full border border-gray-300  px-4 py-2"
                />
            </div>

            <button
                type="submit"
                className="text-white px-4 py-2 bg-[rgb(59,59,59)] text-sm transition duration-200 w-full"
            >
                POST
            </button>
        </form>
    );
}
