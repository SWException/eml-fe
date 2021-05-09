import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Dashboard from 'pages/admin/dashboard';

describe("Dashboard page", () => {
    it("should render", () => {
        render(<Dashboard />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

