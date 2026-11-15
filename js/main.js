/* JM Designs — small interactions only. Everything works without this file. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* Live listing preview (home page) */
  var form = document.getElementById("preview-form");
  if (form) {
    var nameIn = form.querySelector("#pv-name");
    var townIn = form.querySelector("#pv-town");
    var tradeIn = form.querySelector("#pv-trade");
    var outName = document.getElementById("pv-out-name");
    var outSearch = document.getElementById("pv-out-search");
    var outMeta = document.getElementById("pv-out-meta");
    var outSite = document.getElementById("pv-out-site");
    var listing = document.getElementById("pv-listing");

    var slug = function (s) {
      return (s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "").slice(0, 28) || "yourbusiness";
    };

    var update = function (animate) {
      var name = nameIn.value.trim() || nameIn.getAttribute("placeholder");
      var town = townIn.value;
      var trade = tradeIn.value;
      var tradeLabel = tradeIn.options[tradeIn.selectedIndex].text;
      outName.textContent = name;
      outSearch.textContent = trade + " near " + town;
      outMeta.innerHTML = "";
      var open = document.createElement("span");
      open.className = "open";
      open.textContent = "Open";
      outMeta.appendChild(open);
      outMeta.appendChild(document.createTextNode(" · " + tradeLabel + " in " + town + ", TX"));
      outSite.textContent = slug(name) + ".com";
      if (animate) {
        listing.classList.remove("is-updating");
        void listing.offsetWidth;
        listing.classList.add("is-updating");
      }
    };

    var timer;
    nameIn.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () { update(false); }, 60);
    });
    nameIn.addEventListener("change", function () { update(true); });
    townIn.addEventListener("change", function () { update(true); });
    tradeIn.addEventListener("change", function () { update(true); });
    form.addEventListener("submit", function (e) { e.preventDefault(); update(true); });
  }

  /* Contact form: client-side checks, then post to the form service */
  var contact = document.getElementById("contact-form");
  if (contact) {
    var pre = new URLSearchParams(window.location.search).get("service");
    var svcSel = document.getElementById("cf-service");
    if (pre && svcSel && svcSel.querySelector('option[value="' + pre.replace(/[^a-z]/g, "") + '"]')) {
      svcSel.value = pre.replace(/[^a-z]/g, "");
    }
    var status = document.getElementById("form-status");
    contact.addEventListener("submit", function (e) {
      var firstBad = null;
      contact.querySelectorAll("[required]").forEach(function (el) {
        var err = document.getElementById(el.id + "-error");
        var bad = !el.value.trim() || (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (err) err.hidden = !bad;
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        e.preventDefault();
        firstBad.focus();
        return;
      }
      if (contact.getAttribute("action") === "FORM_ENDPOINT") {
        e.preventDefault();
        status.hidden = false;
        status.className = "form-status";
        status.textContent = "This form isn't connected yet. Add the form service address in contact.html (see README), or email " + contact.dataset.email + ".";
        return;
      }
      if (window.fetch && window.FormData) {
        e.preventDefault();
        var btn = contact.querySelector("button[type=submit]");
        btn.disabled = true;
        btn.textContent = "Sending…";
        fetch(contact.action, { method: "POST", body: new FormData(contact), headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("bad status");
            contact.reset();
            status.hidden = false;
            status.className = "form-status ok";
            status.textContent = "Message sent. I'll reply within one business day.";
            btn.textContent = "Message sent";
          })
          .catch(function () {
            status.hidden = false;
            status.className = "form-status";
            status.textContent = "Your message didn't go through. Try again, or call or email me directly.";
            btn.disabled = false;
            btn.textContent = "Send message";
          });
      }
    });
  }

  /* Entrances: once, staggered within each section */
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var groups = document.querySelectorAll("[data-reveal]");
    groups.forEach(function (g) {
      Array.prototype.forEach.call(g.querySelectorAll(":scope > *"), function (child, i) {
        child.classList.add("reveal");
        child.style.setProperty("--d", Math.min(i, 5) * 80 + "ms");
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    groups.forEach(function (g) { io.observe(g); });
  }
})();
