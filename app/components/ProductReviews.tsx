'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({ productId, averageRating, totalReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  async function loadReviews() {
    try {
      const data = await fetchApi<Review[]>(`/products/${productId}/reviews`);
      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetchApi(`/products/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(newReview)
      });
      await loadReviews();
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLikeReview(reviewId: string) {
    try {
      await fetchApi(`/reviews/${reviewId}/like`, { method: 'POST' });
      await loadReviews();
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <motion.div
        className="bg-[#1F1F1F] p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Based on {totalReviews} reviews
            </p>
          </div>
        </div>
      </motion.div>

      {/* Write Review */}
      <motion.form
        className="bg-[#1F1F1F] p-6 rounded-lg space-y-4"
        onSubmit={handleSubmitReview}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold">Write a Review</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= newReview.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
          placeholder="Write your review..."
          className="w-full p-3 rounded bg-[#2E2E2E] text-white resize-none h-32"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </motion.form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="bg-[#1F1F1F] p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{review.userName}</h4>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleLikeReview(review.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-orange-400"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{review.likes}</span>
              </button>
            </div>
            <p className="mt-4 text-gray-300">{review.comment}</p>

            {/* Replies */}
            {review.replies.length > 0 && (
              <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
                {review.replies.map((reply) => (
                  <div key={reply.id} className="bg-[#2E2E2E] p-4 rounded">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{reply.userName}</h5>
                      <p className="text-sm text-gray-400">
                        {new Date(reply.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-300">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 