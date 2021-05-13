import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import CategoryManagement from 'pages/admin/categoryManagement';

describe("CategoryManagement page", () => {
    it("should render", () => {
        render(<CategoryManagement initialCategories={null} />);
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});

