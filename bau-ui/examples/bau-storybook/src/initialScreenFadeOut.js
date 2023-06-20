export function initialScreenFadeOut() {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.classList.add("m-fadeOut");
  }
}
