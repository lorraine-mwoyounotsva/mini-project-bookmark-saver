const nameField = document.getElementById("site-name");
      const urlField = document.getElementById("site-url");
      const saveBtn = document.getElementById("save-btn");
      const linkList = document.getElementById("saved-links");

      document.addEventListener("DOMContentLoaded", displayBookmarks);

      saveBtn.addEventListener("click", () => {
        const title = nameField.value.trim();
        const link = urlField.value.trim();

        if (!title || !link) {
          alert("Both fields are required.");
          return;
        }

        if (!/^https?:\/\//i.test(link)) {
          alert("Please enter a valid URL including http:// or https://");
          return;
        }

        createBookmark(title, link);
        storeBookmark(title, link);
        nameField.value = "";
        urlField.value = "";
      });

      function createBookmark(title, link) {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        const removeBtn = document.createElement("button");

        anchor.href = link;
        anchor.textContent = title;
        anchor.target = "_blank";

        removeBtn.textContent = "Delete";
        removeBtn.classList.add("delete-btn");
        removeBtn.onclick = () => {
          linkList.removeChild(listItem);
          removeFromStorage(title, link);
        };

        listItem.appendChild(anchor);
        listItem.appendChild(removeBtn);
        linkList.appendChild(listItem);
      }

      function getStored() {
        return JSON.parse(localStorage.getItem("quickmarks")) || [];
      }

      function storeBookmark(title, link) {
        const entries = getStored();
        entries.push({ title, link });
        localStorage.setItem("quickmarks", JSON.stringify(entries));
      }

      function displayBookmarks() {
        const saved = getStored();
        saved.forEach(({ title, link }) => createBookmark(title, link));
      }

      function removeFromStorage(title, link) {
        let entries = getStored();
        entries = entries.filter(
          (item) => item.title !== title || item.link !== link
        );
        localStorage.setItem("quickmarks", JSON.stringify(entries));
      }
