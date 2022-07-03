/**
 * Toggle options box on focus
 */
const searchBox = document.querySelector(".search-box");
const searchOptions = document.querySelector(".search-options");
const stickyHeader = document.querySelector(".sticky");
const searchClose = document.querySelector(".searchClose");
const searchInput = document.querySelector(".search");

searchBox.addEventListener("focusin", (e) => {
  searchOptions.classList.remove("hidden");
});

/**
 * Hide searched div when clicked outside
 */
document.addEventListener("click", (event) => {
  if (!stickyHeader.contains(event.target)) {
    searchOptions.classList.add("hidden");
    searchInput.value = "";
    searchClose.style.opacity = 0;
    searchClose.style.visibility = "hidden";
  }
});

searchInput.addEventListener("input", () => {
  if (searchInput.value === "") {
    searchClose.style.opacity = 0;
    searchClose.style.visibility = "hidden";
  } else {
    searchClose.style.opacity = 1;
    searchClose.style.visibility = "visible";
  }
});
searchClose.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchClose.style.opacity = 0;
  searchClose.style.visibility = "hidden";

  searchInput.focus();
});

//TRENDS
const trendList = document.querySelector(".right-list");
trendList.addEventListener("click", (e) => {
  e.preventDefault();
  const trendBtn = e.target.closest(".trends-icon");
  if (!trendBtn) return;
  const trendID = trendBtn.getAttribute("href").slice(1);
  const trendBox = trendBtn.closest(".trend-item");

  const html = `<div id='${trendID}' class="interest-box scale-up-ver-top">
  <div class="not-interested">
    <i class="ph-smiley-sad"></i>
    <span>Not interested in this</span>
  </div>
  <div class="not-interested">
    <i class="ph-smiley-sad"></i>
    <span>This trend is harmful or spammy</span>
  </div>
</div>`;
  trendBox.insertAdjacentHTML("afterbegin", html);

  //REMOVE INTERESTBOX
  const interestBox = document.querySelector(`#${trendID}`);
  /**
   * remove interestBox and click event
   */
  const removeInterestBox = function (event) {
    if (
      (!interestBox.contains(event.target) &&
        !trendBtn.contains(event.target)) ||
      interestBox.contains(event.target)
    ) {
      trendBox.removeChild(interestBox);
      document.removeEventListener("click", removeInterestBox);
    }
  };

  document.addEventListener("click", removeInterestBox);

  const notInterested = interestBox.querySelectorAll(".not-interested");

  notInterested.forEach((notI) => {
    notI.addEventListener("click", (e) => {
      removeInterestBox(e);
      trendBox.innerHTML = `<div class="deletedInterest">Thanks. Refresh this page to update these trends.</div>`;
    });
  });
});

//COOKIE Settings
const cookieElement = document.querySelector(".cookie");
const cookieBtns = document.querySelectorAll(".btn-cookie");

const cookie = localStorage.getItem("twitterCookie");
if (!cookie) {
  cookieElement.classList.remove("hidden");

  cookieBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("twitterCookie", `${btn.dataset.btnCookie}`);
      cookieElement.classList.add("hidden");
    });
  });
}

//Follow button
const followList = document.querySelector(".follow-list");

const buttonHandle = (btnFollow) => {
  btnFollow.dataset.userFollowing =
    btnFollow.dataset.userFollowing === "true" ? "false" : "true";

  let isFollowing = btnFollow.dataset.userFollowing === "true";

  //POKUSAJ DINAMIZIRANJA DUGMETA

  btnFollow.addEventListener("mouseleave", () => {
    if (btnFollow.dataset.userFollowing === "true") {
      btnFollow.classList.remove("btn-follow");
      btnFollow.classList.add("btn-following");
      btnFollow.textContent = "Following";
    }
  });

  btnFollow.addEventListener("mouseenter", () => {
    if (btnFollow.dataset.userFollowing === "true") {
      btnFollow.textContent = "Unfollow";
    }
  });

  if (isFollowing) {
    btnFollow.textContent = "Following";
    btnFollow.classList.remove("btn-follow");
    btnFollow.classList.add("btn-following");
  } else {
    btnFollow.textContent = "Follow";
    btnFollow.classList.add("btn-follow");
    btnFollow.classList.remove("btn-following");
  }
};

followList.addEventListener("click", (e) => {
  const btnFollow = e.target.closest(".btn");
  if (!btnFollow) return;
  buttonHandle(btnFollow);
});

//FOLLOW MORE BOX
const followLinks = document.querySelectorAll(".img-link, .follow-text-box");
followLinks.forEach((link) => {
  link.addEventListener("mouseenter", (e) => {
    const linkEl = e.target.closest(".follow-box");

    const btnFollow = linkEl.querySelector(".btn");
    const isFollowing = btnFollow.dataset.userFollowing === "true";

    let btnText = isFollowing ? "Following" : "Follow";

    const img = linkEl.querySelector(".img-width").getAttribute("src");

    const name = linkEl.querySelector(".follow-heading").textContent;

    const subName = linkEl.querySelector(".follow-subheading").textContent;

    const description = linkEl.dataset.userDesc;
    const following = linkEl.dataset.userFollowing;
    const followers = linkEl.dataset.userFollowers;

    const html = `
    <div class="follow--more-info">
      <div class="follow--more-box" data-follow-user="${name}">
        <div class="follow-img follow--more-img">
          <img class="img-width follow-img" src="${img}" alt="${name} logo">
        </div>
        <button data-user-following="${isFollowing}" class="btn btn-${
      isFollowing ? "following" : "follow"
    }">
    ${btnText}
        </button>
      </div>
      <div class="follow--more-content">
        <div class="follow-text-box">
          <div class="follow-header">

            <h3 class="heading-tertiary follow-heading ">${name}</h3>
            <i class="ph-star-fill"></i>
          </div>
          <div class="follow-subheading">${subName}</div>
        </div>
      </div>
      <p class="follow--more-desc">
        ${description}
      </p>
      <div class="follow--more-nums">
        <a href="#"><span>${following}</span> Following</a><a href="#"><span>${followers}</span> Followers</a>
      </div>
    </div>`;

    //

    setTimeout(function () {
      linkEl.insertAdjacentHTML("afterbegin", html);

      let newBox = linkEl.querySelector(".follow--more-info");

      newBox.addEventListener("mouseleave", () => {
        linkEl.removeChild(newBox);
      });

      const btnNewFollow = newBox.querySelector(".btn");
      btnNewFollow.addEventListener("click", () => {
        btnFollow.dataset.userFollowing = btnNewFollow.dataset.userFollowing;
        buttonHandle(btnFollow);
      });
    }, 500);
  });
});
