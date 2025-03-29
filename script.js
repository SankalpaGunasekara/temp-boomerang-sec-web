// DOM Elements
const header = document.querySelector(".header")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuClose = document.querySelector(".mobile-menu-close")
const testimonialDots = document.querySelectorAll(".testimonial-dot")
const testimonialSlides = document.querySelectorAll(".testimonial-slide")
const statNumbers = document.querySelectorAll(".stat-number")
const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up")
const currentYearEl = document.getElementById("current-year")

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear()

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active")
  document.body.style.overflow = "hidden"
})

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active")
  document.body.style.overflow = ""
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Testimonial slider
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    // Remove active class from all dots and slides
    testimonialDots.forEach((d) => d.classList.remove("active"))
    testimonialSlides.forEach((s) => s.classList.remove("active"))

    // Add active class to current dot and slide
    dot.classList.add("active")
    testimonialSlides[index].classList.add("active")
  })
})

// Auto-rotate testimonials
let testimonialIndex = 0
const autoRotateTestimonials = () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length
  testimonialDots.forEach((d) => d.classList.remove("active"))
  testimonialSlides.forEach((s) => s.classList.remove("active"))
  testimonialDots[testimonialIndex].classList.add("active")
  testimonialSlides[testimonialIndex].classList.add("active")
}

let testimonialInterval = setInterval(autoRotateTestimonials, 5000)

// Pause auto-rotation when user interacts with testimonials
testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(testimonialInterval)
    // Restart auto-rotation after 10 seconds of inactivity
    setTimeout(() => {
      testimonialInterval = setInterval(autoRotateTestimonials, 5000)
    }, 10000)
  })
})

// Animate stats counter
const animateStats = () => {
  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 16ms per frame (approx 60fps)
    let current = 0

    const updateCounter = () => {
      current += step
      if (current < target) {
        stat.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        stat.textContent = target
      }
    }

    updateCounter()
  })
}

// Reveal animations on scroll
const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      // Add delay if specified
      const delay = el.getAttribute("data-delay")
      if (delay) {
        setTimeout(() => {
          el.classList.add("active")
        }, Number.parseInt(delay))
      } else {
        el.classList.add("active")
      }
    }
  })
}

// Check if element is in viewport for stats animation
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Initialize animations
window.addEventListener("scroll", () => {
  revealOnScroll()

  // Animate stats when stats section comes into view
  const statsSection = document.querySelector(".stats-section")
  if (statsSection && isInViewport(statsSection) && !statsSection.classList.contains("animated")) {
    statsSection.classList.add("animated")
    animateStats()
  }
})

// Trigger initial reveal for elements above the fold
window.addEventListener("load", () => {
  revealOnScroll()
})

