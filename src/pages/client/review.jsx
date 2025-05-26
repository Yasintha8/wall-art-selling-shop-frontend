import React from "react";

const reviews = [
    {
        name: "Alice Johnson",
        title: "Verified Buyer",
        image: "https://i.pravatar.cc/100?img=1",
        rating: 5,
        comment:
            "Amazing service and fast delivery. The quality of the products exceeded my expectations. Will definitely shop again!",
    },
    {
        name: "Michael Lee",
        title: "Loyal Customer",
        image: "https://i.pravatar.cc/100?img=2",
        rating: 4,
        comment:
            "Very satisfied with the overall experience. Customer support was helpful and the packaging was excellent.",
    },
    {
        name: "Sara Kim",
        title: "First-Time Buyer",
        image: "https://i.pravatar.cc/100?img=3",
        rating: 5,
        comment:
            "Love the design and quality. The site is easy to navigate and checkout was a breeze. Highly recommended!",
    },
    {
        name: "Emily Davis",
        title: "Verified Buyer",
        image: "https://i.pravatar.cc/100?img=4",
        rating: 3,
        comment:
            "Great selection of products. The website is user-friendly and the customer service was excellent.",
    },
];

function Star({ filled }) {
    return (
        <svg
            className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.293 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
    );
}

export default function Review() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Customer Reviews</h1>
                <p className="text-center text-gray-600 mb-12">
                    What our customers are saying about their shopping experience.
                </p>

                <div className="space-y-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {review.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">{review.title}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} filled={i < review.rating} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
