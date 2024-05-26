import Button from "@components/Button/Button.tsx";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button", () => {
    it("renders correctly", () => {
        const result = render(
            <Button handleClick={vi.fn()} text="Click me!" />
        );
        expect(result).toMatchSnapshot();
    });

    it("should display the correct text when rendered", () => {
        render(<Button handleClick={vi.fn()} text="Click me!" />);
        expect(screen.getByRole("button")).toBeDefined();
    });

    it("should call handleClick when clicked", () => {
        const handleClick = vi.fn();
        render(<Button handleClick={handleClick} text="Click me!" />);
        fireEvent.click(screen.getByText("Click me!"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("should render correctly with empty text", () => {
        render(<Button handleClick={vi.fn()} text="" />);
        expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not throw any error when handleClick is an empty function and button is clicked", () => {
        render(<Button handleClick={vi.fn()} text="Click me!" />);
        expect(() => {
            fireEvent.click(screen.getByText("Click me!"));
        }).not.toThrow();
    });
});
