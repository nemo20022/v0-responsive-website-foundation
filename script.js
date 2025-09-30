/**
 * Mobile Navigation Toggle
 * Handles opening and closing the mobile navigation menu
 */

;(() => {
  // Get DOM elements
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Check if elements exist
  if (!mobileMenuToggle || !mainNav) {
    console.warn("Mobile menu elements not found")
    return
  }

  /**
   * Toggle mobile menu open/closed
   */
  function toggleMobileMenu() {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true"

    // Toggle aria-expanded attribute
    mobileMenuToggle.setAttribute("aria-expanded", !isOpen)

    // Toggle is-open class on nav
    mainNav.classList.toggle("is-open")

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "" : "hidden"
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu() {
    mobileMenuToggle.setAttribute("aria-expanded", "false")
    mainNav.classList.remove("is-open")
    document.body.style.overflow = ""
  }

  // Event listener for menu toggle button
  mobileMenuToggle.addEventListener("click", toggleMobileMenu)

  // Close menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Only close on mobile
      if (window.innerWidth <= 768) {
        closeMobileMenu()
      }
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = mainNav.contains(event.target)
    const isClickOnToggle = mobileMenuToggle.contains(event.target)
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true"

    if (!isClickInsideNav && !isClickOnToggle && isOpen) {
      closeMobileMenu()
    }
  })

  // Close menu on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true"
      if (isOpen) {
        closeMobileMenu()
        mobileMenuToggle.focus()
      }
    }
  })

  // Handle window resize
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Close mobile menu if window is resized to desktop size
      if (window.innerWidth > 768) {
        closeMobileMenu()
      }
    }, 250)
  })

  /**
   * Smooth scroll for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if href is just "#"
      if (href === "#") {
        e.preventDefault()
        return
      }

      const target = document.querySelector(href)

      if (target) {
        e.preventDefault()

        // Get header height for offset
        const header = document.querySelector(".site-header")
        const headerHeight = header ? header.offsetHeight : 0

        // Calculate scroll position
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  console.log("[v0] Mobile navigation initialized")
})()
