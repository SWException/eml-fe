import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Profile from 'pages/profile';

describe("Order page", () => {
    it("should render", () => {
        render(<Profile />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

