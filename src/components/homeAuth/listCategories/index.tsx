import useSWR from "swr";
import categoriesService, { CategoryType } from "../../../services/categoriesService";
import ListCategoriesSlide from "../listCategoriesSlide";
import PageSpinner from "../../common/spinner";

const ListCategories = function () {
  const { data, error } = useSWR("/listCategories", categoriesService.getCategories);

  if (error) return <p className="text-center text-danger">Erro ao carregar as categorias. Tente novamente mais tarde.</p>;
  if (!data) return <PageSpinner />;

  // Verifique se categories é um array antes de mapear
  const categories = data.data.categories || [];

  return (
    <>
      {categories.length > 0 ? (
        categories.map((category: CategoryType) => (
          <ListCategoriesSlide
            key={category.id}
            categoryId={category.id}
            categoryName={category.name}
          />
        ))
      ) : (
        <p className="text-center">Nenhuma categoria disponível no momento.</p>
      )}
    </>
  );
};

export default ListCategories;
