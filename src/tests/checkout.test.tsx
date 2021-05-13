import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Checkout from 'pages/payment/checkout';

describe("Checkout page", () => {
    it("should render", () => {
        render(<Checkout />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

