import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Star, User, CreditCard, Check, Film, Ticket, Heart, Play } from 'lucide-react';

const MovieBookingApp = () => {
  const [currentView, setCurrentView] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Mock data - in real app this would come from backend
  const movies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi, Adventure",
      duration: "192 min",
      rating: 8.1,
      image: "/Image/avatar-way-of-water.jpg",
      description: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora...",
      showtimes: [
        { id: 1, time: "10:00 AM", date: "2024-05-24", theater: "Screen 1", price: 15 },
        { id: 2, time: "2:30 PM", date: "2024-05-24", theater: "Screen 1", price: 18 },
        { id: 3, time: "6:00 PM", date: "2024-05-24", theater: "Screen 2", price: 20 },
        { id: 4, time: "9:30 PM", date: "2024-05-24", theater: "Screen 2", price: 20 }
      ]
    },
    {
      id: 2,
      title: "Top Gun: Maverick",
      genre: "Action, Drama",
      duration: "130 min",
      rating: 8.7,
      image: "/Image/top-gun.png",
      description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but he must confront the ghosts of his past...",
      showtimes: [
        { id: 5, time: "11:00 AM", date: "2024-05-24", theater: "Screen 3", price: 15 },
        { id: 6, time: "3:00 PM", date: "2024-05-24", theater: "Screen 3", price: 18 },
        { id: 7, time: "7:00 PM", date: "2024-05-24", theater: "Screen 1", price: 20 }
      ]
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action, Crime",
      duration: "176 min",
      rating: 7.8,
      image: "/Image/the-batman.jpg",
      description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman must track down the killer's identity...",
      showtimes: [
        { id: 8, time: "1:00 PM", date: "2024-05-24", theater: "Screen 2", price: 18 },
        { id: 9, time: "5:30 PM", date: "2024-05-24", theater: "Screen 3", price: 20 },
        { id: 10, time: "9:00 PM", date: "2024-05-24", theater: "Screen 1", price: 22 }
      ]
    },
    {
      id: 4,
      title: "Spider-Man: No Way Home",
      genre: "Action, Adventure",
      duration: "148 min",
      rating: 8.4,
      image: "/Image/spider-man.jpg",
      description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear...",
      showtimes: [
        { id: 11, time: "12:00 PM", date: "2024-05-24", theater: "Screen 1", price: 16 },
        { id: 12, time: "4:00 PM", date: "2024-05-24", theater: "Screen 2", price: 19 },
        { id: 13, time: "8:00 PM", date: "2024-05-24", theater: "Screen 3", price: 21 }
      ]
    }
  ];

  const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    for (let row of rows) {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const isBooked = Math.random() < 0.3; // 30% chance of being booked
        seats.push({
          id: seatId,
          row: row,
          number: i,
          isBooked: isBooked,
          isSelected: false
        });
      }
    }
    return seats;
  };

  const [seats, setSeats] = useState(generateSeats());

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.isBooked) return;

    setSeats(seats.map(s => 
      s.id === seatId 
        ? { ...s, isSelected: !s.isSelected }
        : s
    ));

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    if (!selectedShowtime) return 0;
    return selectedSeats.length * selectedShowtime.price;
  };

  const handleBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Please fill in all details');
      return;
    }
    
    // In real app, this would make API call to backend
    alert(`Booking confirmed! 
Movie: ${selectedMovie.title}
Showtime: ${selectedShowtime.time}
Seats: ${selectedSeats.join(', ')}
Total: $${calculateTotal()}
Confirmation sent to: ${bookingData.email}`);
    
    // Reset state
    setCurrentView('movies');
    setSelectedMovie(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setBookingData({ name: '', email: '', phone: '' });
    setSeats(generateSeats());
  };

  const MovieCard = ({ movie }) => (
    <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
      <div className="relative overflow-hidden">
        <img src={movie.image} alt={movie.title} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors">
            <Play className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{movie.title}</h3>
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-yellow-700">{movie.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {movie.genre.split(',')[0]}
          </span>
          <span className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {movie.duration}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{movie.description}</p>
        
        <button
          onClick={() => {
            setSelectedMovie(movie);
            setCurrentView('showtimes');
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Book Tickets
        </button>
      </div>
    </div>
  );

  const ShowtimeView = () => (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => setCurrentView('movies')}
        className="mb-6 inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        ← Back to Movies
      </button>
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title} 
                className="w-48 h-72 object-cover rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                ⭐ {selectedMovie.rating}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {selectedMovie.genre.split(',').map((genre, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{selectedMovie.duration}</span>
                </div>
                <div className="flex items-center">
                  <Film className="w-5 h-5 mr-2" />
                  <span>HD</span>
                </div>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">{selectedMovie.description}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Choose Your Showtime</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedMovie.showtimes.map(showtime => (
              <div
                key={showtime.id}
                onClick={() => {
                  setSelectedShowtime(showtime);
                  setCurrentView('seats');
                }}
                className="group relative border-2 border-gray-200 rounded-2xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">{showtime.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-medium">{showtime.theater}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">${showtime.price}</div>
                    <div className="text-sm text-gray-500">per ticket</div>
                    <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Available
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-blue-600 text-white p-1 rounded-full">
                    <Ticket className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SeatSelection = () => (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => setCurrentView('showtimes')}
        className="mb-6 inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        ← Back to Showtimes
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Select Your Perfect Seats</h2>
          <p className="text-purple-100">{selectedMovie.title} • {selectedShowtime.time} • {selectedShowtime.theater}</p>
        </div>

        <div className="p-8">
          {/* Screen */}
          <div className="mb-12 text-center">
            <div className="relative mx-auto max-w-4xl">
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 rounded-full mb-3 shadow-lg"></div>
              <div className="text-gray-600 font-semibold tracking-widest">SCREEN</div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-lg mr-3 shadow-sm"></div>
                  <span className="font-medium text-gray-700">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mr-3 shadow-sm"></div>
                  <span className="font-medium text-gray-700">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mr-3 shadow-sm"></div>
                  <span className="font-medium text-gray-700">Booked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seats */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-inner">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                <div key={row} className="flex justify-center items-center mb-4 last:mb-0">
                  <div className="w-10 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-700 font-bold rounded-lg text-sm">
                      {row}
                    </span>
                  </div>
                  <div className="flex gap-2 mx-4">
                    {Array.from({ length: 6 }, (_, i) => {
                      const seatId = `${row}${i + 1}`;
                      const seat = seats.find(s => s.id === seatId);
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={seat.isBooked}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-110 ${
                            seat.isBooked
                              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white cursor-not-allowed shadow-lg'
                              : seat.isSelected
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                              : 'bg-white hover:bg-gray-100 text-gray-700 shadow-md border-2 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="w-8"></div>
                  <div className="flex gap-2 mx-4">
                    {Array.from({ length: 6 }, (_, i) => {
                      const seatId = `${row}${i + 7}`;
                      const seat = seats.find(s => s.id === seatId);
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={seat.isBooked}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 transform hover:scale-110 ${
                            seat.isBooked
                              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white cursor-not-allowed shadow-lg'
                              : seat.isSelected
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                              : 'bg-white hover:bg-gray-100 text-gray-700 shadow-md border-2 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {i + 7}
                        </button>
                      );
                    })}
                  </div>
                  <div className="w-10 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-700 font-bold rounded-lg text-sm">
                      {row}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Selected Seats</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {seat}
                      </span>
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-green-600">Total: ${calculateTotal()}</p>
                </div>
                <button
                  onClick={() => setCurrentView('booking')}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const BookingForm = () => (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentView('seats')}
        className="mb-6 inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        ← Back to Seat Selection
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Complete Your Booking</h2>
          <p className="text-green-100">Just one step away from your movie experience!</p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                  <Ticket className="w-5 h-5 mr-2 text-blue-600" />
                  Booking Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">Movie</span>
                    <span className="font-bold text-gray-900">{selectedMovie.title}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">Showtime</span>
                    <span className="font-bold text-gray-900">{selectedShowtime.time}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">Theater</span>
                    <span className="font-bold text-gray-900">{selectedShowtime.theater}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-600">Seats</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border-2 border-green-200">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                  Payment Method
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-4 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
                    <input type="radio" name="payment" id="card" className="mr-3" defaultChecked />
                    <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <label htmlFor="card" className="font-semibold text-gray-900">Credit/Debit Card</label>
                      <p className="text-sm text-gray-600">Secure payment with 256-bit SSL encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Check className="w-6 h-6 mr-3" />
                Confirm Booking - ${calculateTotal()}
              </button>
              
              <div className="text-center text-sm text-gray-500">
                <p>🔒 Your payment information is secure and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <header className="relative bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                <Film className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CinemaMax
                </h1>
                <p className="text-sm text-gray-600">Premium Movie Experience</p>
              </div>
            </div>
            
            {/* Navigation Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-3 py-1 rounded-full ${currentView === 'movies' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-500'}`}>
                Movies
              </span>
              <span className="text-gray-300">→</span>
              <span className={`px-3 py-1 rounded-full ${currentView === 'showtimes' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-500'}`}>
                Showtimes
              </span>
              <span className="text-gray-300">→</span>
              <span className={`px-3 py-1 rounded-full ${currentView === 'seats' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-500'}`}>
                Seats
              </span>
              <span className="text-gray-300">→</span>
              <span className={`px-3 py-1 rounded-full ${currentView === 'booking' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-500'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8">
        {currentView === 'movies' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                Now Showing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the latest blockbusters and experience cinema like never before
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-semibold text-gray-700">Premium Quality</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg">
                  <Film className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-semibold text-gray-700">4K Experience</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {/* Featured Section */}
            <div className="mt-16 bg-white/40 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">Premium Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/60 rounded-2xl">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Premium Seating</h4>
                    <p className="text-gray-600">Luxury recliner seats with extra legroom</p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-2xl">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Film className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">4K Projection</h4>
                    <p className="text-gray-600">Crystal clear picture quality</p>
                  </div>
                  <div className="text-center p-6 bg-white/60 rounded-2xl">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Easy Booking</h4>
                    <p className="text-gray-600">Quick and secure online reservations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'showtimes' && <ShowtimeView />}
        {currentView === 'seats' && <SeatSelection />}
        {currentView === 'booking' && <BookingForm />}
      </main>

      {/* Footer */}
      <footer className="relative mt-16 bg-white/20 backdrop-blur-lg border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-xl">
                <Film className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CinemaMax
              </span>
            </div>
            <p className="text-gray-600">© 2024 CinemaMax. All rights reserved.</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MovieBookingApp;