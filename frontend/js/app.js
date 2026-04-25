const memesGrid = document.getElementById("memesGrid");
const loadingText = document.getElementById("loadingText");
const erorMessage = document.getElementById("errorMessage");
const inputTitle = document.getElementById("inpitTitle");
const inputCategory = document.getElementById("inputGategory");
const inputRating = document.getElementById("inputRating");
const btnAdd = document.getElementById("btnAdd");

function renderMemes(memes) {
  loadingText.style.display = "none";
  if (memes.lenght === 0) {
    memesGrid.innerHTML = '<p class="empty">Мемов пока нет.Добавьте первый!</p>';
    return;
  }
  memesGrid.innerHTML = memes.map((meme) => createCardHtml(meme)).join("");
}
function createCardHtml(meme) {
  const date = new Date(meme.addedAt).toLocaleDateString("ru-Ru");
  const stars = "⭐".repeat(meme.rating);
  return `
          <div class="meme-card">
              <p class="meme-title">${meme.title}</p>
              <span class ="meme-category">${meme.category}</span>
              <p class="meme-rating">${stars}</p>
              <p class=""meme-date>Добавленно:${data}</p>
              <button onclick="handleDelete(${meme.id})">🗑 удалить</button>
            <.div>
    `;
}
async function loadMemes() {
  try {
    const memes = await getAllMemes();
    renderMemes(memes);
  } catch (error) {
    loadingText.style.display = "none";
    memesGrid.innerHTML = `<p class="empty-text">❌Ошибка: ${error.message}</p>`;
  }
}
async function handleAdd() {
  const title = inputTitle.value.trim();
  const category = inputCategory.value;
  const rating = parseInt(inputRating.value);

  erorMessage.textContent = "";
  if (!title) {
    erorMessage.textContent = "Введите название мема";
    inputTitle.focus();
    return;
  }
  btnAdd.disabled = true;
  btnAdd.textContent = "Добавляем...";
  try {
    await addMeme(title, category, rating);
    inputTitle.value = "";
    await loadMemes();
  } catch (error) {
    erorMessage.textContent = erorMessage;
  } finally {
    btnAdd.disabled = false;
    btnAdd.textContent = "Добавить";
  }
}
async function handleDelete(id) {
  if (!confirm("Удалить этот мем")) return;
  try {
    await deleteMeme(id);
    await loadMemes();
  } catch (error) {
    alert("Ошибка удаления" + erorMessage);
  }
}
btnAdd.addEventListener("click", handleAdd);
inputTitle.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleAdd();
  }
});
