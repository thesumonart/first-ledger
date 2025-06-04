document.addEventListener("DOMContentLoaded", function () {
  const addLiquidity = document.getElementById("add-liquidity-modal");
  const actionButtons = document.querySelectorAll(".action-add-icon");

  // remove liquidity
  const removeLiquidity = document.getElementById("remove-liquidity-modal");
  const removeLiquidityButtons = document.querySelectorAll(
    ".action-remove-icon"
  );

  // Function to add click-outside-to-close functionality to any modal
  function addClickOutsideToClose(modalClone) {
    // Close modal when clicking outside of modal content
    modalClone.addEventListener("click", function (event) {
      // Check if the clicked target is the modal overlay (not the modal content)
      if (event.target === modalClone) {
        modalClone.remove();
      }
    });

    // Prevent modal from closing when clicking inside the modal content
    const modalContent = modalClone.querySelector(".modal-content");
    if (modalContent) {
      modalContent.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    }

    // Close modal with Escape key
    const escapeKeyHandler = function (event) {
      if (event.key === "Escape" && modalClone.style.display !== "none") {
        modalClone.remove();
        document.removeEventListener("keydown", escapeKeyHandler);
      }
    };
    document.addEventListener("keydown", escapeKeyHandler);
  }

  actionButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const tokenDetailsModal = document.querySelector(".token-details-modal");
      if (tokenDetailsModal && tokenDetailsModal.classList.contains("show")) {
        tokenDetailsModal.classList.remove("show");
      }
      let modalClone = addLiquidity.cloneNode(true);
      modalClone.id = `modal-${index}`;
      document.body.appendChild(modalClone);
      modalClone.style.display = "flex";
      addClickOutsideToClose(modalClone);

      // xrp background color changed
      const inputs = modalClone.querySelectorAll(
        ".wallet-input,.xrp-input-payment"
      );
      const xrpContainers = modalClone.querySelectorAll(".xrp");

      inputs.forEach((input) => {
        input.addEventListener("focus", function () {
          xrpContainers.forEach((xrp) => xrp.classList.remove("active"));
          this.closest(".xrp").classList.add("active");
        });

        input.addEventListener("blur", function () {
          setTimeout(() => {
            if (
              !document.querySelector(".wallet-input:focus") &&
              !document.querySelector(".xrp-input-payment:focus")
            ) {
              xrpContainers.forEach((xrp) => xrp.classList.remove("active"));
            }
          }, 50);
        });
      });

      // Hide steps initially
      modalClone.querySelector("#step-confirm").style.display = "none";
      modalClone.querySelector("#step-confirm-single-sided").style.display =
        "none";
      modalClone.querySelector("#step-vote-done-numeric").style.display =
        "none";
      modalClone.querySelector("#step-done-single-sided").style.display =
        "none";
      modalClone.querySelector("#step-voting").style.display = "none";
      modalClone.querySelector("#step-complete").style.display = "none";

      // Remove loading class and hide the loading icon
      modalClone.querySelector(".loading-icon").style.display = "none";
      modalClone.querySelector(".loading-icon-vote").style.display = "none";
      modalClone.querySelector(".loading-icon-voting").style.display = "none";
      modalClone.querySelector(".loading-icon-single-sided").style.display =
        "none";

      // token select
      const tokenListModalOverlay = document.querySelector(
        ".select-token-list-modal-overlay"
      );
      const tokenListModalCloseButton = document.querySelector(
        ".token-list-modal-close-btn"
      );
      const changeTokenButton =
        modalClone.querySelectorAll(".change-token-btn");
      const tokenListModalContent = document.querySelector(
        ".select-token-list-modal-content"
      ); // Assuming a content wrapper

      const tokenOptions = document.querySelectorAll(".token-item");

      const closeTokenListModal = () => {
        tokenListModalOverlay.style.display = "none";
      };

      const openTokenListModal = () => {
        tokenListModalOverlay.style.display = "flex";
      };

      if (
        tokenListModalOverlay &&
        tokenListModalCloseButton &&
        changeTokenButton
      ) {
        tokenListModalOverlay.addEventListener("click", (event) => {
          if (event.target === tokenListModalOverlay) {
            closeTokenListModal();
          }
        });

        tokenListModalCloseButton.addEventListener("click", (event) => {
          event.stopPropagation();
          closeTokenListModal();
        });

        changeTokenButton.forEach((button) => {
          button.addEventListener("click", openTokenListModal);
        });

        tokenOptions.forEach((btn) => {
          btn.addEventListener("click", function (event) {
            event.stopPropagation();

            // Find the closest `.token-item` (in case event is triggered from a child element)
            const tokenItem = event.currentTarget;

            // Find the `.token-name` inside this `.token-item`
            const tokenNameElement = tokenItem.querySelector(".token-name");

            if (tokenNameElement) {
              const tokenName = tokenNameElement.textContent;

              // Set the text of `.token-name`
              const tokenBtnTxt = modalClone.querySelector(".token-btn-txt");
              const tokenBtnTxtSingle = modalClone.querySelector(
                ".token-btn-txt-single"
              );

              if (tokenBtnTxt) {
                tokenBtnTxt.textContent = tokenName;
              }

              if (tokenBtnTxtSingle) {
                tokenBtnTxtSingle.textContent = tokenName;
              }

              console.log("Token Name Set To:", tokenName);
            }

            closeTokenListModal();
          });
        });
      }

      // wallet select
      const walletDropdown = modalClone.querySelectorAll(
        ".modal-wallet-dropdown"
      );
      const walletOptions = modalClone.querySelectorAll(
        ".modal-dropdown-options"
      );

      walletDropdown.forEach((btn) => {
        btn.addEventListener("click", function (event) {
          // Prevent the dropdown from closing if the click is inside the dropdown options
          if (!event.target.closest(".modal-dropdown-options")) {
            walletOptions.forEach((option) => {
              option.classList.toggle("show");
            });
          }
        });
      });

      // Add event listener to each modal-option
      const modalOptions = modalClone.querySelectorAll(".modal-option");
      modalOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const selectedWalletName =
            option.querySelector(".modal-wallet-name").textContent;
          const selectedOptionElement = modalClone.querySelector(
            "#modal-selected-option"
          );

          // Update the selected option text
          selectedOptionElement.textContent = selectedWalletName;

          // Close the dropdown options
          walletOptions.forEach((option) => {
            option.classList.remove("show");
          });
        });
      });

      // if outside the dropdown, close it

      // Handle closing modal
      modalClone
        .querySelector(".close-modal")
        .addEventListener("click", function () {
          modalClone.remove();
        });
      modalClone
        .querySelector("#step-numeric-done")
        .addEventListener("click", function () {
          modalClone.remove();
        });
      modalClone
        .querySelector("#step-done-single-sided-btn")
        .addEventListener("click", function () {
          modalClone.remove();
        });

      // Handle tab switching
      const tabButtons = modalClone.querySelectorAll(".tab-btn");
      const tabContents = modalClone.querySelectorAll(".tab-content");

      tabButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          tabButtons.forEach((tab) => tab.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          this.classList.add("active");
          modalClone
            .querySelector(`#${this.dataset.tab}`)
            .classList.add("active");
        });
      });

      // Handle Review button clicks
      modalClone.querySelectorAll(".review").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.querySelector("#step-review").style.display = "none";
          modalClone.querySelector("#step-confirm").style.display = "block";
        });
      });

      modalClone.querySelectorAll(".review-single-sided").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.querySelector("#step-review").style.display = "none";
          modalClone.querySelector("#step-confirm").style.display = "none";
          modalClone.querySelector("#step-confirm-single-sided").style.display =
            "block";
        });
      });

      // Handle Cancel button clicks
      modalClone.querySelectorAll("#step-cancel").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.remove();
        });
      });

      // ✅ Handle confirm loading (apply loading class to all buttons individually)
      const buttonsToLoad = modalClone.querySelectorAll(
        "#numeric-confirm, #single-sided-confirm, .cancel-btn, .close-modal"
      );

      buttonsToLoad.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Show loading state
          modalClone.querySelector(".loading-icon").style.display = "block";
          modalClone.querySelector(".loading-icon-single-sided").style.display =
            "block";

          // Add loading class to the button clicked
          buttonsToLoad.forEach((button) => button.classList.add("is-loading"));

          // Simulate loading for 2 seconds
          setTimeout(() => {
            // Remove the loading class after 2 seconds
            buttonsToLoad.forEach((button) =>
              button.classList.remove("is-loading")
            );

            // Hide the loading icon
            modalClone.querySelector(".loading-icon").style.display = "none";
            modalClone.querySelector(
              ".loading-icon-single-sided"
            ).style.display = "none";

            // Transition to next step based on which button was clicked
            if (btn.id === "numeric-confirm") {
              modalClone.querySelector("#step-confirm").style.display = "none";
              modalClone.querySelector(
                "#step-vote-done-numeric"
              ).style.display = "block";
            } else if (btn.id === "single-sided-confirm") {
              modalClone.querySelector(
                "#step-confirm-single-sided"
              ).style.display = "none";
              modalClone.querySelector(
                "#step-done-single-sided"
              ).style.display = "block";
            }
          }, 2000); // 2 seconds delay
        });
      });

      // handle voting button clicks

      const buttonsToVote = modalClone.querySelectorAll(
        "#numeric-vote, #step-numeric-done, .close-modal, #numeric-voting"
      );

      buttonsToVote.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Show loading state
          modalClone.querySelector(".loading-icon-vote").style.display =
            "block";
          modalClone.querySelector(".loading-icon-voting").style.display =
            "block";

          // Add loading class to the button clicked
          buttonsToVote.forEach((button) => button.classList.add("is-loading"));

          // Simulate loading for 2 seconds
          setTimeout(() => {
            // Remove the loading class after 2 seconds
            buttonsToVote.forEach((button) =>
              button.classList.remove("is-loading")
            );

            // Hide the loading icon
            modalClone.querySelector(".loading-icon-vote").style.display =
              "none";
            modalClone.querySelector(".loading-icon-voting").style.display =
              "none";

            // Transition to next step based on which button was clicked
            if (btn.id === "numeric-vote") {
              modalClone.querySelector(
                "#step-vote-done-numeric"
              ).style.display = "none";
              modalClone.querySelector("#step-voting").style.display = "block";
            } else if (btn.id === "numeric-voting") {
              modalClone.querySelector("#step-voting").style.display = "none";
              modalClone.querySelector("#step-complete").style.display =
                "block";
            } else if (btn.id === "done-btn") {
              modalClone.remove();
            }
          }, 2000); // 2 seconds delay
        });
      });

      modalClone.querySelectorAll("#step-complete-done").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.remove();
        });
      });

      // ranger

      const feeRange = modalClone.querySelector("#feeRange");
      const feeValue = modalClone.querySelector("#feeValue");

      if (feeRange && feeValue) {
        feeRange.addEventListener("input", () => {
          feeValue.textContent = feeRange.value;
        });
      }

      // tooltip

      const icons = modalClone.querySelectorAll(".info-icon");

      icons.forEach((icon) => {
        const tooltipText = icon.getAttribute("data-tooltip");
        if (!tooltipText) return;

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = tooltipText;
        icon.parentElement.appendChild(tooltip);

        icon.addEventListener("mouseenter", function () {
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = "1";
        });

        icon.addEventListener("mouseleave", function () {
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = "0";
        });
      });
    });
  });

  // remove modal
  removeLiquidityButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const tokenDetailsModal = document.querySelector(".token-details-modal");
      if (tokenDetailsModal && tokenDetailsModal.classList.contains("show")) {
        tokenDetailsModal.classList.remove("show");
      }
      let modalClone = removeLiquidity.cloneNode(true);
      modalClone.id = `rm-modal-${index}`;
      document.body.appendChild(modalClone);
      modalClone.style.display = "flex";
      addClickOutsideToClose(modalClone);

      // Hide steps initially
      modalClone.querySelector("#rm-step-confirm").style.display = "none";
      modalClone.querySelector("#rm-step-confirm-single-sided").style.display =
        "none";
      modalClone.querySelector("#rm-step-done-numeric").style.display = "none";
      modalClone.querySelector("#rm-step-done-single-sided").style.display =
        "none";

      // Remove loading class and hide the loading icon
      modalClone.querySelector(".loading-icon").style.display = "none";
      modalClone.querySelector(".loading-icon-single-sided").style.display =
        "none";

      // Handle closing modal
      modalClone
        .querySelector(".close-modal")
        .addEventListener("click", function () {
          modalClone.remove();
        });
      modalClone
        .querySelector("#rm-step-done-numeric")
        .addEventListener("click", function () {
          modalClone.remove();
        });
      modalClone
        .querySelector("#rm-step-done-single-sided")
        .addEventListener("click", function () {
          modalClone.remove();
        });

      // wallet dropdown
      const walletDropdown = modalClone.querySelectorAll(
        ".modal-wallet-dropdown"
      );
      const walletOptions = modalClone.querySelectorAll(
        ".modal-dropdown-options"
      );

      walletDropdown.forEach((btn) => {
        btn.addEventListener("click", function (event) {
          // Prevent the dropdown from closing if the click is inside the dropdown options
          if (!event.target.closest(".modal-dropdown-options")) {
            walletOptions.forEach((option) => {
              option.classList.toggle("show");
            });
          }
        });
      });

      // Add event listener to each modal-option
      const modalOptions = modalClone.querySelectorAll(".modal-option");
      modalOptions.forEach((option) => {
        option.addEventListener("click", function () {
          const selectedWalletName =
            option.querySelector(".modal-wallet-name").textContent;
          const selectedOptionElement = modalClone.querySelector(
            "#modal-selected-option"
          );

          // Update the selected option text
          selectedOptionElement.textContent = selectedWalletName;

          // Close the dropdown options
          walletOptions.forEach((option) => {
            option.classList.remove("show");
          });
        });
      });

      // Handle tab switching
      const tabButtons = modalClone.querySelectorAll(".tab-btn");
      const tabContents = modalClone.querySelectorAll(".tab-content");

      tabButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          tabButtons.forEach((tab) => tab.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          this.classList.add("active");
          modalClone
            .querySelector(`#${this.dataset.tab}`)
            .classList.add("active");
        });
      });

      // xrp and token toggle buttons
      const xrpToggle = modalClone.querySelector(".xrp-toggle");
      const tokenToggle = modalClone.querySelector(".token-toggle");

      xrpToggle.addEventListener("click", function () {
        tokenToggle.classList.remove("active");
        xrpToggle.classList.add("active");
      });

      tokenToggle.addEventListener("click", function () {
        xrpToggle.classList.remove("active");
        tokenToggle.classList.add("active");
      });

      // Handle Review button clicks
      modalClone.querySelectorAll(".review").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.querySelector("#rm-step-review").style.display = "none";
          modalClone.querySelector("#rm-step-confirm").style.display = "block";
        });
      });

      modalClone.querySelectorAll(".rm-review-single-sided").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.querySelector("#rm-step-review").style.display = "none";
          modalClone.querySelector("#rm-step-confirm").style.display = "none";
          modalClone.querySelector(
            "#rm-step-confirm-single-sided"
          ).style.display = "block";
        });
      });

      // Handle Cancel button clicks
      modalClone.querySelectorAll("#step-cancel").forEach((btn) => {
        btn.addEventListener("click", function () {
          modalClone.remove();
        });
      });

      // ✅ Handle confirm loading (apply loading class to all buttons individually)
      const buttonsToLoadForRM = modalClone.querySelectorAll(
        "#rm-numeric-confirm, #rm-single-sided-confirm, .cancel-btn, .close-modal"
      );

      buttonsToLoadForRM.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Show loading state
          modalClone.querySelector(".loading-icon").style.display = "block";
          modalClone.querySelector(".loading-icon-single-sided").style.display =
            "block";

          // Add loading class to the button clicked
          buttonsToLoadForRM.forEach((button) =>
            button.classList.add("is-loading")
          );

          // Simulate loading for 2 seconds
          setTimeout(() => {
            // Remove the loading class after 2 seconds
            buttonsToLoadForRM.forEach((button) =>
              button.classList.remove("is-loading")
            );

            // Hide the loading icon
            modalClone.querySelector(".loading-icon").style.display = "none";
            modalClone.querySelector(
              ".loading-icon-single-sided"
            ).style.display = "none";

            console.log("Button clicked:", btn);

            // Transition to next step based on which button was clicked
            if (btn.id === "rm-numeric-confirm") {
              console.log("rm-numeric-confirm matched");
              modalClone.querySelector("#rm-step-confirm").style.display =
                "none";
              modalClone.querySelector("#rm-step-done-numeric").style.display =
                "block";
            } else if (btn.id === "rm-single-sided-confirm") {
              console.log("rm-single-sided-confirm matched");
              modalClone.querySelector(
                "#rm-step-confirm-single-sided"
              ).style.display = "none";
              modalClone.querySelector(
                "#rm-step-done-single-sided"
              ).style.display = "block";
            } else {
              console.log("No condition matched for:", btn.id);
            }
          }, 2000); // 2 seconds delay
        });
      });
      // ranger

      const feeRange = modalClone.querySelector("#feeRange");
      const feeValue = modalClone.querySelector("#feeValue");

      if (feeRange && feeValue) {
        feeRange.addEventListener("input", () => {
          feeValue.textContent = feeRange.value;
        });
      }

      // tooltip

      const icons = modalClone.querySelectorAll(".info-icon");

      icons.forEach((icon) => {
        const tooltipText = icon.getAttribute("data-tooltip");
        if (!tooltipText) return;

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.textContent = tooltipText;
        icon.parentElement.appendChild(tooltip);

        icon.addEventListener("mouseenter", function () {
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = "1";
        });

        icon.addEventListener("mouseleave", function () {
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = "0";
        });
      });
    });
  });
});
