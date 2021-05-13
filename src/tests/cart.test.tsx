import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Cart from '../pages/cart';

describe("Cart page", () => {
    it("should render", async () => {
        render(<Cart />);
        expect(await screen.findByRole("main")).toBeInTheDocument();
    });
});

