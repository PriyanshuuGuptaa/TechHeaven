const ProductReducer = (state, action) => {
  switch (action.type) {
    case "ALL_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        filteredByCategory: action.payload
      };
    }
    case "ALL_CATEGORIES": {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case "CLEAR_ALL_FILTERS": {
      return {
        ...state,
        filteredProducts: action.payload
      };
    }
    case "SET_CATEGORY": {
      return {
        ...state,
        filteredByCategory: action.payload,
        filteredProducts: action.payload
      }
    }
    case "SET_PRICE": {
      return {
        ...state,
        filteredProducts: action.payload,
      };
    }
    case "SET_RATING": {
      return {
        ...state,
        filteredProducts: action.payload,
      };
    }
    case "SET_DISCOUNT": {
      return {
        ...state,
        filteredProducts: action.payload,
      };
    }

    case "SEARCH_PRODUCTS": {
      return {
        ...state,
        filteredProducts: action.payload
      }
    }

    default: {
      return {
      }
    }
  }
};

export default ProductReducer;
