import React from "react";
import brandStyles from "../styles/Brand.module.css";

const Table = ({ brandFoods }) => {
  const tableHeadings = [
    {
      name: "food",
      dataName: "item_name",
      text: "Food",
      isSorted: true,
      sortDirection: "down",
    },
    {
      name: "calories",
      dataName: "nf_calories",
      text: "Calories (kcal)",
      isSorted: false,
      sortDirection: "",
    },
    {
      name: "protein",
      dataName: "nf_protein",
      text: "Protein (g)",
      isSorted: false,
      sortDirection: "",
    },
    {
      name: "carbohydrates",
      dataName: "nf_total_carbohydrate",
      text: "Carbs (g)",
      isSorted: false,
      sortDirection: "",
    },
    {
      name: "fat",
      dataName: "nf_total_fat",
      text: "Fat (g)",
      isSorted: false,
      sortDirection: "",
    },
    {
      name: "protein-ratio",
      dataName: "nf_protein_ratio",
      text: "Protein kcal / Total kcal",
      isSorted: false,
      sortDirection: "",
    },
  ];
  const [tableColumns, setTableColumns] = React.useState(tableHeadings);

  const [foodData, setFoodData] = React.useState(
    brandFoods.map((brandFood) => {
      return (
        (brandFood.fields["nf_protein_ratio"] =
          (brandFood.fields.nf_protein * 4) / brandFood.fields.nf_calories ||
          0),
        brandFood.fields
      );
    })
  );

  const onSortChange = (columnIndex) => {
    let newSortDirection, categoryToSort;
    if (tableColumns[columnIndex].isSorted) {
      tableColumns[columnIndex].sortDirection === "up"
        ? (newSortDirection = "down")
        : (newSortDirection = "up");
      changeSortDirection(columnIndex, newSortDirection);
    } else {
      removeSort();
      assignNewSort(columnIndex);
    }
    categoryToSort = tableColumns[columnIndex].dataName;
    sortFoodData(categoryToSort, newSortDirection);
  };

  const removeSort = () => {
    setTableColumns((prevTableColums) => {
      return (
        prevTableColums.forEach(
          (el) => ((el.isSorted = false), (el.sortDirection = ""))
        ),
        [...prevTableColums]
      );
    });
  };

  const assignNewSort = (columnIndex) => {
    setTableColumns((prevTableColums) => {
      return (
        (prevTableColums[columnIndex].isSorted = true), [...prevTableColums]
      );
    });
  };

  const changeSortDirection = (columnIndex, newSortDirection) => {
    setTableColumns((prevTableColums) => {
      return (
        (prevTableColums[columnIndex].sortDirection = newSortDirection),
        [...prevTableColums]
      );
    });
  };

  const sortFoodData = (categoryToSort, newSortDirection) => {
    let sortedFoodData;
    newSortDirection ? "" : (newSortDirection = "down");

    if (newSortDirection === "up") {
      sortedFoodData = [...foodData].sort((a, b) => {
        return a[categoryToSort] > b[categoryToSort] ? 1 : -1;
      });
    } else {
      sortedFoodData = [...foodData].sort((a, b) => {
        return a[categoryToSort] > b[categoryToSort] ? -1 : 1;
      });
    }

    setFoodData(sortedFoodData);
  };

  return (
    <div>
      <h1 className={brandStyles.sectionTitle}>
        {brandFoods[0].fields.brand_name}
      </h1>
      <br />
      <table id="table" className={brandStyles.table}>
        <thead>
          <tr>
            {tableColumns.map((item, i) => (
              <th key={i} onClick={() => onSortChange(i, item.name)}>
                {item.text}{" "}
                {item.isSorted
                  ? item.sortDirection === "up"
                    ? String.fromCharCode(8593)
                    : String.fromCharCode(8595)
                  : "-"}
              </th>
            ))}
          </tr>
        </thead>
        <thead>
          {foodData.map((food) => (
            <tr key={food.item_id}>
              <td>{food.item_name}</td>
              <td>{food.nf_calories}</td>
              <td>{food.nf_protein}</td>
              <td>{food.nf_total_carbohydrate}</td>
              <td>{food.nf_total_fat}</td>
              <td>{food.nf_protein_ratio.toFixed(3)}</td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default Table;
