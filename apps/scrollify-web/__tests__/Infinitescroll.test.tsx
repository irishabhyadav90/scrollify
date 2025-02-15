import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfiniteScrollList from "../src/components/InfiniteScrollList";
import { useInfiniteScroll } from "@scrollify/hooks";

jest.mock("@scrollify/hooks", () => ({
    useInfiniteScroll: jest.fn(),
}));

describe("InfiniteScrollList Component", () => {
    beforeEach(() => {
        (useInfiniteScroll as jest.Mock).mockReturnValue({
            data: Array.from({ length: 10 }, (_, i) => ({ title: `Item ${i + 1}` })),
            loading: false,
            hasMore: true,
            loadMore: jest.fn(),
        });
    });

    it("renders the list items correctly", async () => {
        render(<InfiniteScrollList />);

        expect(screen.getByText("Item 1")).toBeInTheDocument();
        expect(screen.getByText("Item 10")).toBeInTheDocument();
    });

    it("triggers `loadMore` when scrolling to the bottom", async () => {
        const loadMoreMock = jest.fn();
        (useInfiniteScroll as jest.Mock).mockReturnValue({
            data: Array.from({ length: 10 }, (_, i) => ({ title: `Item ${i + 1}` })),
            loading: false,
            hasMore: true,
            loadMore: loadMoreMock,
        });

        render(<InfiniteScrollList />);

        await waitFor(() => {
            expect(loadMoreMock).toHaveBeenCalled();
        });
    });

    it("shows a loading indicator when fetching data", () => {
        (useInfiniteScroll as jest.Mock).mockReturnValue({
            data: [],
            loading: true,
            hasMore: true,
            loadMore: jest.fn(),
        });

        render(<InfiniteScrollList />);

        expect(screen.getByText("Loading more items...")).toBeInTheDocument();
    });

    it("does not call `loadMore` if `hasMore` is false", async () => {
        const loadMoreMock = jest.fn();
        (useInfiniteScroll as jest.Mock).mockReturnValue({
            data: Array.from({ length: 10 }, (_, i) => ({ title: `Item ${i + 1}` })),
            loading: false,
            hasMore: false,
            loadMore: loadMoreMock,
        });

        render(<InfiniteScrollList />);

        await waitFor(() => {
            expect(loadMoreMock).not.toHaveBeenCalled();
        });
    });
});
