import { useState } from "react";
import "./App.css";

import surmaiThali from "./assets/surmai-thali.jpg";
import fishThali from "./assets/fish-thali.jpg";
import prawns from "./assets/prawns.jpg";
import fishPlatter from "./assets/fish-platter.jpg";

function App() {
  const [activeCategory, setActiveCategory] = useState("Seafood");
  const [cart, setCart] = useState([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);

  /* =====================================================
     MENU
  ===================================================== */

  const menu = {
    Seafood: [
      {
        name: "Surmai Piece",
        description:
          "Fresh Surmai prepared in authentic Malvani style.",
        price: 250,
      },
      {
        name: "Pomfret Piece",
        description:
          "Fresh Pomfret with traditional coastal flavours.",
        price: 500,
      },
      {
        name: "Bombil Plate",
        description:
          "Traditional Bombil preparation.",
        price: 110,
      },
      {
        name: "Mandeli Plate",
        description:
          "Fresh Mandeli prepared in coastal style.",
        price: 160,
      },
    ],

    Prawns: [
      {
        name: "Prawns Rava Fry",
        description:
          "Crispy prawns coated with traditional rava masala.",
        price: 190,
      },
      {
        name: "Prawns Masala",
        description:
          "Prawns cooked with authentic Malvani masala.",
        price: 290,
      },
    ],

    "Chicken & Mutton": [
      {
        name: "Chicken Plate",
        description:
          "Traditional Malvani chicken preparation.",
        price: 120,
      },
      {
        name: "Dry Chicken Masala Fry",
        description:
          "Dry chicken with traditional Malvani spices.",
        price: 170,
      },
      {
        name: "Mutton Plate",
        description:
          "Traditional Malvani mutton preparation.",
        price: 170,
      },
      {
        name: "Dry Mutton Masala Fry",
        description:
          "Dry mutton preparation with traditional spices.",
        price: 220,
      },
    ],

    "Sides & More": [
      {
        name: "Chapati",
        description:
          "Freshly prepared chapati.",
        price: 10,
      },
      {
        name: "Bhakri",
        description:
          "Traditional Konkan bhakri.",
        price: 20,
      },
      {
        name: "Vada Plate",
        description:
          "Traditional vada plate.",
        price: 60,
      },
      {
        name: "Steamed Rice",
        description:
          "Freshly steamed rice.",
        price: 30,
      },
      {
        name: "Solkadhi",
        description:
          "Traditional refreshing Konkan drink.",
        price: 45,
      },
      {
        name: "Usal Plate",
        description:
          "Traditional spicy usal preparation.",
        price: 60,
      },
      {
        name: "Shrikhand",
        description:
          "Traditional creamy Shrikhand.",
        price: 40,
      },
    ],
  };

  /* =====================================================
     CART
  ===================================================== */

  const addToCart = (item) => {
    const existing = cart.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const changeQuantity = (name, amount) => {
    setCart(
      cart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  /* =====================================================
     REVIEW
  ===================================================== */

  const submitReview = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.reviewName.value.trim();
    const reviewText = form.reviewText.value.trim();

    if (!name || !reviewText || reviewRating === 0) {
      alert(
        "Please enter your name, rating and review."
      );
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name,
      rating: reviewRating,
      text: reviewText,
    };

    setReviews([
      newReview,
      ...reviews,
    ]);

    setReviewRating(0);
    setReviewOpen(false);

    alert(
      "Thank you! Your review has been added."
    );

    form.reset();
  };

  return (
    <div className="site">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">

        <a
          href="#home"
          className="logo"
        >
          <span>TRUPTI</span>

          <small>
            MALVANI MACCHI KHANAVAL
          </small>
        </a>

        <nav>

          <a href="#about">
            About
          </a>

          <a href="#specialities">
            Specialities
          </a>

          <a href="#menu">
            Menu
          </a>

          <a href="#gallery">
            Gallery
          </a>

          <a href="#reviews">
            Reviews
          </a>

          <a href="#contact">
            Contact
          </a>

        </nav>

        <div className="nav-buttons">

          <button
            className="cart-button"
            onClick={() =>
              setOrderOpen(true)
            }
          >
            Order

            {totalItems > 0 && (
              <span>
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="book-button"
            onClick={() =>
              setBookingOpen(true)
            }
          >
            Book a Table
          </button>

        </div>

      </header>


      {/* =================================================
          HERO
      ================================================= */}

      <main>

        <section
          className="hero"
          id="home"
        >

          <div className="hero-photo">

            <img
              src={fishThali}
              alt="Malvani fish thali"
            />

          </div>

          <div className="hero-shade"></div>

          <div className="hero-content">

            <p className="eyebrow">
              AUTHENTIC MALVANI SEAFOOD
            </p>

            <h1>
              Taste
              <em> the Konkan.</em>
            </h1>

            <p className="hero-text">
              Traditional coastal flavours,
              fresh seafood and the warmth
              of a true Konkan kitchen.
            </p>

            <div className="hero-actions">

              <a
                href="#menu"
                className="button button-light"
              >
                Explore Menu
              </a>

              <button
                className="button button-outline"
                onClick={() =>
                  setBookingOpen(true)
                }
              >
                Book a Table
              </button>

            </div>

          </div>

          <div className="hero-bottom">

            <span>
              CHIPLUN · MAHARASHTRA
            </span>

            <span>
              EST. 2022
            </span>

          </div>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          className="intro-section"
          id="about"
        >

          <div className="intro-small">

            <span>
              01
            </span>

            <p>
              OUR STORY
            </p>

          </div>

          <div className="intro-main">

            <h2>
              A little taste of
              <em> home.</em>
            </h2>

            <p>
              Trupti Malavni Macchi Khanaval
              brings the flavours of the Konkan
              coast to Chiplun.
            </p>

            <p>
              Started in 2022, our kitchen
              celebrates traditional Malvani
              recipes and fresh seafood.
            </p>

            <p>
              From our famous Surmai Thali
              to freshly prepared prawns and
              traditional sides, every plate
              is inspired by the food and
              culture of coastal Maharashtra.
            </p>

          </div>

          <div className="intro-image">

            <img
              src={surmaiThali}
              alt="Surmai Thali"
            />

            <span>
              SURMAI THALI
            </span>

          </div>

        </section>


        {/* =================================================
            SPECIALITIES
        ================================================= */}

        <section
          className="specialities"
          id="specialities"
        >

          <div className="section-top">

            <div>

              <span className="section-number">
                02
              </span>

              <p>
                FROM OUR KITCHEN
              </p>

            </div>

            <h2>
              What we are
              <em> known for.</em>
            </h2>

          </div>

          <div className="speciality-grid">

            <article className="speciality-card large">

              <div className="card-image">

                <img
                  src={surmaiThali}
                  alt="Surmai Thali"
                />

              </div>

              <div className="card-text">

                <span>
                  01
                </span>

                <h3>
                  Surmai Thali
                </h3>

                <p>
                  Our signature speciality.
                </p>

              </div>

            </article>


            <article className="speciality-card">

              <div className="card-image">

                <img
                  src={prawns}
                  alt="Prawns"
                />

              </div>

              <div className="card-text">

                <span>
                  02
                </span>

                <h3>
                  Prawns
                </h3>

                <p>
                  Fresh coastal flavours.
                </p>

              </div>

            </article>


            <article className="speciality-card">

              <div className="card-image">

                <img
                  src={fishPlatter}
                  alt="Fish Special"
                />

              </div>

              <div className="card-text">

                <span>
                  03
                </span>

                <h3>
                  Fish Special
                </h3>

                <p>
                  Authentic Malvani preparation.
                </p>

              </div>

            </article>

          </div>

        </section>


        {/* =================================================
            MENU
        ================================================= */}

        <section
          className="menu-section"
          id="menu"
        >

          <div className="menu-title">

            <span className="section-number">
              03
            </span>

            <p>
              OUR MENU
            </p>

            <h2>
              Simple food.
              <br />
              <em>Real flavour.</em>
            </h2>

          </div>


          <div className="menu-tabs">

            {Object.keys(menu).map(
              (category) => (

                <button
                  key={category}
                  className={
                    activeCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  {category}
                </button>

              )
            )}

          </div>


          <div className="menu-list">

            {menu[activeCategory].map(
              (item) => (

                <div
                  className="menu-row"
                  key={item.name}
                >

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>


                  <div className="menu-price">

                    <strong>
                      ₹{item.price}
                    </strong>

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* =================================================
            ORDER BANNER
        ================================================= */}

        <section className="order-banner">

          <div>

            <span>
              HUNGRY?
            </span>

            <h2>
              Bring the Konkan
              <em> to your table.</em>
            </h2>

          </div>

          <button
            className="button button-dark"
            onClick={() =>
              setOrderOpen(true)
            }
          >
            Order Online

            {totalItems > 0 &&
              ` · ${totalItems}`}
          </button>

        </section>


        {/* =================================================
            GALLERY
        ================================================= */}

        <section
          className="gallery"
          id="gallery"
        >

          <div className="gallery-title">

            <span className="section-number">
              04
            </span>

            <p>
              A GLIMPSE
            </p>

            <h2>
              Food worth
              <em> remembering.</em>
            </h2>

          </div>


          <div className="gallery-layout">

            <div className="gallery-photo photo-one">

              <img
                src={fishThali}
                alt="Fish Thali"
              />

            </div>


            <div className="gallery-photo photo-two">

              <img
                src={prawns}
                alt="Prawns"
              />

            </div>


            <div className="gallery-photo photo-three">

              <img
                src={fishPlatter}
                alt="Fish platter"
              />

            </div>


            <div className="gallery-caption">

              Fresh ingredients.
              <br />

              Traditional recipes.
              <br />

              <em>
                Konkan soul.
              </em>

            </div>

          </div>

        </section>


        {/* =================================================
            REVIEWS
        ================================================= */}

        <section
          className="reviews"
          id="reviews"
        >

          <div className="reviews-heading">

            <span className="section-number">
              05
            </span>

            <p>
              GUEST EXPERIENCES
            </p>

            <h2>
              Loved for the
              <em> food.</em>
            </h2>

          </div>


          {/* GOOGLE RATING */}

          <div className="rating-box">

            <div className="rating-number">
              4.5
            </div>

            <div>

              <div className="stars">
                ★★★★★
              </div>

              <p>
                Google rating
              </p>

            </div>

          </div>


          {/* GOOGLE REVIEWS */}

          <div className="review-note">

            <p>
              See what guests have
              shared about their
              experience at Trupti
              Malavni Macchi Khanaval.
            </p>


            <div className="review-actions">

              <a
                href="https://www.google.com/maps/place/Trupti+Malavani+Macchi+Khanaval/@17.5217794,73.5080137,17z/data=!4m17!1m8!3m7!1s0x3bc207b904f98383:0x2ca7b5bf1e4dd26f!2sTrupti+Malavani+Macchi+Khanaval!8m2!3d17.5217794!4d73.5080137!10e9!16s%2Fg%2F11mwpwsw0n!3m7!1s0x3bc207b904f98383:0x2ca7b5bf1e4dd26f!8m2!3d17.5217794!4d73.5080137!9m1!1b1!16s%2Fg%2F11mwpwsw0n?authuser=0&entry=ttu"
                target="_blank"
                rel="noreferrer"
                className="google-review-link"
              >
                Read Google Reviews →
              </a>

            </div>

          </div>


          {/* WEBSITE REVIEWS */}

          <div className="website-reviews">

            <div className="website-reviews-header">

              <span>
                CUSTOMER REVIEWS
              </span>

              <strong>
                {reviews.length}{" "}
                {reviews.length === 1
                  ? "review"
                  : "reviews"}
              </strong>

            </div>


            {reviews.length > 0 ? (

              <div className="review-grid">

                {reviews.map(
                  (review) => (

                    <article
                      className="review-card"
                      key={review.id}
                    >

                      <div className="review-card-top">

                        <div>

                          <h3>
                            {review.name}
                          </h3>

                          <span>
                            Guest
                          </span>

                        </div>


                        <div className="review-stars">

                          {"★".repeat(
                            review.rating
                          )}

                          <span className="empty-stars">

                            {"★".repeat(
                              5 - review.rating
                            )}

                          </span>

                        </div>

                      </div>


                      <p>
                        {review.text}
                      </p>

                    </article>

                  )
                )}

              </div>

            ) : (

              <div className="no-reviews">

                <span>
                  BE THE FIRST
                </span>

                <p>
                  Share your experience
                  with Trupti Malavni
                  Macchi Khanaval.
                </p>

                <button
                  onClick={() =>
                    setReviewOpen(true)
                  }
                >
                  Write the First Review
                </button>

              </div>

            )}

          </div>

        </section>


        {/* =================================================
            BOOKING CTA
        ================================================= */}

        <section className="booking-cta">

          <div>

            <span>
              RESERVATIONS
            </span>

            <h2>
              Make a table
              <em> yours.</em>
            </h2>

            <p>
              Planning a meal with family
              or friends? Reserve your table
              at Trupti.
            </p>

          </div>


          <button
            className="button button-light"
            onClick={() =>
              setBookingOpen(true)
            }
          >
            Book a Table
          </button>

        </section>


        {/* =================================================
            CONTACT
        ================================================= */}

        <section
          className="contact"
          id="contact"
        >

          <div className="contact-heading">

            <span className="section-number">
              06
            </span>

            <p>
              COME FIND US
            </p>

            <h2>
              See you in
              <em> Chiplun.</em>
            </h2>

          </div>


          <div className="contact-grid">

            <div>

              <span>
                ADDRESS
              </span>

              <p>
                Pag Mala, Guhagar
                Bypass Road,
                <br />
                Chiplun 415605
              </p>

            </div>


            <div>

              <span>
                OPENING HOURS
              </span>

              <p>
                11:30 AM – 3:30 PM
                <br />
                7:00 PM – 11:00 PM
              </p>

            </div>


            <div>

              <span>
                PHONE
              </span>

              <a href="tel:+918767636610">
                +91 87676 36610
              </a>

            </div>


            <div className="directions">

              <a
                href="https://maps.app.goo.gl/jbfvFwbMFz9nYGi77"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions

                <span>
                  ↗
                </span>

              </a>

            </div>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        <div className="footer-main">

          <div className="footer-logo">

            <h2>
              TRUPTI
            </h2>

            <p>
              Malavni Macchi Khanaval
            </p>

          </div>


          <div className="footer-tagline">
            Taste the Konkan.
          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 Trupti Malavni Macchi Khanaval
          </span>

          <span>
            Chiplun · Maharashtra
          </span>

        </div>

      </footer>


     {/* =================================================
    BOOKING POPUP
================================================= */}

{bookingOpen && (

  <div className="popup">

    <div className="popup-box">

      <button
        className="close-popup"
        onClick={() =>
          setBookingOpen(false)
        }
      >
        ×
      </button>


      <span>
        RESERVATIONS
      </span>


      <h2>
        Book a <em>Table.</em>
      </h2>


      <form
        onSubmit={(e) => {

          e.preventDefault();

          alert(
            "Your table request has been received!"
          );

          setBookingOpen(false);

        }}
      >

        {/* NAME */}

        <input
          type="text"
          placeholder="Your name"
          required
        />


        {/* PHONE */}

        <input
          type="tel"
          placeholder="Phone number"
          required
        />


        {/* TIME ONLY */}

        <input
          type="time"
          required
        />


        {/* NUMBER OF GUESTS */}

        <select
          required
          defaultValue=""
        >

          <option
            value=""
            disabled
          >
            Number of guests
          </option>

          <option>
            1 Guest
          </option>

          <option>
            2 Guests
          </option>

          <option>
            3 Guests
          </option>

          <option>
            4 Guests
          </option>

          <option>
            5 Guests
          </option>

          <option>
            6 Guests
          </option>

          <option>
            7 Guests
          </option>

          <option>
            8 Guests
          </option>

        </select>


        {/* SPECIAL REQUEST */}

        <textarea
          rows="4"
          placeholder="Special request (optional)"
        ></textarea>


        {/* SUBMIT */}

        <button
          type="submit"
          className="button button-dark"
        >
          Request Reservation
        </button>

      </form>

    </div>

  </div>

)}

      {/* =================================================
          ORDER POPUP
      ================================================= */}

      {orderOpen && (

        <div className="popup">

          <div className="popup-box order-box">

            <button
              className="close-popup"
              onClick={() =>
                setOrderOpen(false)
              }
            >
              ×
            </button>


            <span>
              YOUR ORDER
            </span>


            <h2>
              Order <em>Online.</em>
            </h2>


            {cart.length === 0 ? (

              <div className="empty-order">

                <p>
                  Your cart is empty.
                </p>


                <button
                  className="button button-dark"
                  onClick={() => {

                    setOrderOpen(false);

                    document
                      .getElementById("menu")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });

                  }}
                >
                  Browse Menu
                </button>

              </div>

            ) : (

              <>

                <div className="cart-list">

                  {cart.map(
                    (item) => (

                      <div
                        className="cart-row"
                        key={item.name}
                      >

                        <div>

                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            ₹{item.price}
                          </p>

                        </div>


                        <div className="quantity">

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.name,
                                -1
                              )
                            }
                          >
                            −
                          </button>


                          <span>
                            {item.quantity}
                          </span>


                          <button
                            onClick={() =>
                              changeQuantity(
                                item.name,
                                1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>


                <div className="cart-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{totalPrice}
                  </strong>

                </div>


                <form
                  onSubmit={(e) => {

                    e.preventDefault();

                    alert(
                      "Order received! Backend ordering will be connected next."
                    );

                    setOrderOpen(false);

                  }}
                >

                  <input
                    type="text"
                    placeholder="Your name"
                    required
                  />


                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                  />


                  <textarea
                    rows="3"
                    placeholder="Order note"
                  ></textarea>


                  <button
                    className="button button-dark"
                    type="submit"
                  >
                    Place Order
                  </button>

                </form>

              </>

            )}

          </div>

        </div>

      )}


      {/* =================================================
          WRITE REVIEW POPUP
      ================================================= */}

      {reviewOpen && (

        <div className="popup">

          <div className="popup-box review-popup">

            <button
              className="close-popup"
              onClick={() => {

                setReviewOpen(false);

                setReviewRating(0);

              }}
            >
              ×
            </button>


            <span>
              GUEST EXPERIENCE
            </span>


            <h2>
              Share your
              <em> experience.</em>
            </h2>


            <form
              onSubmit={submitReview}
            >

              <input
                type="text"
                name="reviewName"
                placeholder="Your name"
                required
              />


              <div className="review-rating-input">

                <label>
                  Your rating
                </label>


                <div className="star-selector">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <button
                        type="button"
                        key={star}
                        className={
                          star <= reviewRating
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setReviewRating(star)
                        }
                      >
                        ★
                      </button>

                    )
                  )}

                </div>


                <span className="rating-label">

                  {reviewRating === 0
                    ? "Select your rating"
                    : `${reviewRating} out of 5 stars`}

                </span>

              </div>


              <textarea
                name="reviewText"
                rows="5"
                placeholder="Tell us about your experience..."
                required
              ></textarea>


              <button
                type="submit"
                className="button button-dark"
              >
                Submit Review
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;