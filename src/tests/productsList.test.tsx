import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ProductsPage from 'pages/products/category/[id]';
import { Product } from 'types';

describe("ProductsPage page", () => {
    it("should render", () => {
        const P1: Product = {
            id: "null",
            name: "1234567890",
            description: "null",
            primaryPhoto: null,
            secondaryPhotos: null,
            categoryId: "null",
            category: "null",
            price: 1234.56,
            netPrice: 5555,
            taxId: "null",
            tax: 4444,
            show: null,
            showHome: null,
            stock: 100,
        };
        render(<ProductsPage initialProducts={[P1]} categoryId={"abc123"} />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

