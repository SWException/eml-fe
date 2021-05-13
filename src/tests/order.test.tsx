import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Order from 'pages/order';

describe("Order page", () => {
    it("should render", () => {
        render(<Order id={null} />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

