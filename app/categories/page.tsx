type Category = {
    id: number;
    name: string;
};

async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:8088/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data kategori");
  }

  return res.json();
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div>
            <h1>Semua Kategori</h1>
            {categories.map((category) => (
                <div key={category.id}>
                    <h2>{category.id} - {category.name}</h2>
                </div>
            ))}
        </div>
    )
}