import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreditCard, Smartphone, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [additionalCourses, setAdditionalCourses] = useState([]);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // Define all courses, including JavaScript
  const courseDetails = {
    react: { id: 'react', name: 'React Course', price: 800 },
    node: { id: 'node', name: 'Node.js Course', price: 1000 },
    system: { id: 'system', name: 'System Design', price: 1200 },
    javascript: { id: 'javascript', name: 'JavaScript Course', price: 0 }, // Add JavaScript course
  };

  // Define coupon codes
  const couponCodes = {
    DISCOUNT40: 0.4,
    DISCOUNT60: 0.6,
    DISCOUNT100: 1,
  };

  // Safely get the course or handle invalid courseId
  const course = courseDetails[courseId];
  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-6">The course you're looking for does not exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Filter out the main course and already added courses
  const otherCourses = Object.values(courseDetails).filter(
    (c) => c.id !== courseId && !additionalCourses.some((ac) => ac.id === c.id)
  );

  const basePrice = course.price + additionalCourses.reduce((sum, c) => sum + c.price, 0);
  const discount = isCouponApplied ? basePrice * couponCodes[couponCode] : 0;
  const total = basePrice - discount;

  const handleAddCourse = (course) => {
    setAdditionalCourses([...additionalCourses, course]);
  };

  const handleRemoveCourse = (index) => {
    setAdditionalCourses(additionalCourses.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = () => {
    if (couponCodes[couponCode]) {
      setIsCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handlePayment = () => {
    if (selectedPayment === 'upi' && !upiId) return alert('Please enter UPI ID');
    if (selectedPayment === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      return alert('Please fill all card details');
    }
    navigate('/checkout/confirmation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl p-6 sm:p-8"
        >
          <h1 className="text-3xl font-bold text-gray-200 mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-200 mb-6">Your Courses</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                    <span className="text-gray-200 text-lg">{course.name}</span>
                    <span className="text-gray-200 font-medium">₹{course.price}</span>
                  </div>
                  <AnimatePresence>
                    {additionalCourses.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-between items-center p-4 bg-gray-700/50 rounded-xl border border-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleRemoveCourse(i)}
                            className="text-red-400 hover:text-red-500 p-1"
                          >
                            <X size={20} />
                          </button>
                          <span className="text-gray-200">+ {c.name}</span>
                        </div>
                        <span className="text-gray-200 font-medium">₹{c.price}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Add More Courses</h3>
                  <div className="space-y-3">
                    {otherCourses.map((c) => (
                      <motion.button
                        key={c.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddCourse(c)}
                        className="w-full flex justify-between items-center p-3 text-base hover:bg-gray-700/50 rounded-lg border border-gray-600 transition-colors"
                      >
                        <span className="text-gray-200">{c.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">₹{c.price}</span>
                          <Plus size={20} className="text-purple-400" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-600">
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-base text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl text-base font-medium hover:bg-purple-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {isCouponApplied && (
                  <div className="text-base text-green-400 mb-4">🎉 {couponCodes[couponCode] * 100}% discount applied!</div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-200 mb-6">Payment Details</h2>
                <div className="space-y-5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment('upi')}
                    className={`w-full p-5 text-left rounded-xl border-2 ${
                      selectedPayment === 'upi'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-purple-400'
                    } transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <Smartphone className="text-purple-400 w-6 h-6" />
                      <span className="text-lg font-medium text-gray-200">UPI Payment</span>
                    </div>
                    {selectedPayment === 'upi' && (
                      <div className="mt-5 space-y-4">
                        <input
                          type="text"
                          placeholder="UPI ID"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-base text-gray-200 focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment('card')}
                    className={`w-full p-5 text-left rounded-xl border-2 ${
                      selectedPayment === 'card'
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 hover:border-purple-400'
                    } transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="text-purple-400 w-6 h-6" />
                      <span className="text-lg font-medium text-gray-200">Credit/Debit Card</span>
                    </div>
                    {selectedPayment === 'card' && (
                      <div className="mt-5 space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-base text-gray-200 focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-base text-gray-200"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-base text-gray-200"
                          />
                        </div>
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-6 bg-gray-700/50 rounded-xl border border-gray-600">
                <div className="space-y-4 text-lg mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-gray-200 font-medium">₹{basePrice}</span>
                  </div>
                  {isCouponApplied && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Discount:</span>
                      <span className="text-green-400 font-medium">-₹{discount}</span>
                    </div>
                  )}
                </div>
                <div className="pt-6 border-t border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-200">Total:</span>
                    <span className="text-2xl font-bold text-purple-400">₹{total}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-600 transition-all"
                >
                  Pay Now - ₹{total}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}