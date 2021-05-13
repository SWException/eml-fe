
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Product } from 'types';

import Index from '../pages/index';

describe("Index page", () => {
    it("no products", async () => {
        const INDEX = render(<Index products={[]} />);
        expect(await screen.findByRole("main")).toBeInTheDocument();
        expect(INDEX.container.innerHTML.indexOf("€")).toBe(-1);
    })
    it("should render", () => {
        const P1: Product = {
            id: null,
            name: "1234567890",
            description: null,
            primaryPhoto: null,
            secondaryPhotos: null,
            categoryId: null,
            category: null,
            price: 1234.56,
            netPrice: 5555,
            taxId: null,
            tax: null,
            show: null,
            showHome: null,
            stock: null,
        };
        const INDEX = render(<Index products={[P1]} />);
        expect(screen.getByRole("main")).toBeInTheDocument();
        expect(screen.getByText(P1.name)).toBeInTheDocument();
        expect(INDEX.container.innerHTML.indexOf(P1.price.toString())).not.toBe(-1);
    });
});
