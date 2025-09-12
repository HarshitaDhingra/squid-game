import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Squid Game", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Milestone 1 - sets light to GREEN when Math.random() < 0.5 and RED when Math.random() >= 0.5", () => {
    // Mock for GREEN
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.3);
    const { container: greenContainer } = render(<App />);
    expect(
      greenContainer.querySelector(".container").getAttribute("data-light")
    ).toBe("GREEN");

    // mock for RED
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.8);
    const { container: redContainer } = render(<App />);
    expect(
      redContainer.querySelector(".container").getAttribute("data-light")
    ).toBe("RED");
  });

  test("Milestone 2 - moving on GREEN increments progress", () => {
    // GREEN light scenario
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.3);
    render(<App />);
    const moveButton = screen.getByText(/Move/i);

    fireEvent.click(moveButton);
    let progressBar = document.querySelector(".progressBar");
    expect(progressBar.style.width).toBe("10%");

    fireEvent.click(moveButton);
    expect(progressBar.style.width).toBe("20%");
  });

  test("Milestone 3 - player wins at 100% progress on GREEN light and moving on RED triggers loss", () => {
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.3);
    const { unmount } = render(<App />);
    const moveButton = screen.getByText(/Move/i);

    // Move 10 times to reach winning position
    for (let i = 0; i < 10; i++) {
      fireEvent.click(moveButton);
    }

    expect(screen.getByText(/You reached the goal/i));
    expect(screen.getByText(/Play Again/i));

    unmount();

    // RED light scenario
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.8);
    render(<App />);
    const moveButtonRed = screen.getByText(/Move/i);

    fireEvent.click(moveButtonRed);
    expect(screen.getByText(/Game Over/i));
    expect(screen.getByText(/Play Again/i));
  });

  test("Milestone 4 - reset after losing and winning clears progress", () => {
    // RESET AFTER LOSING SCENARIO
    // Force RED light for loss
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.8);
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByText(/Move/i)); // triggers loss

    expect(screen.getByText(/Game Over/i));

    // Reset game
    fireEvent.click(screen.getByText(/Play Again/i));

    // Verify progress reset
    let progressBar = document.querySelector(".progressBar");
    expect(progressBar.style.width).toBe("0%");

    // Verify move button is visible after reset
    expect(screen.getByText(/Move/i));

    unmount();

    // // RESET AFTER WINNING SCENARIO
    // // Force GREEN light for winning
    jest.spyOn(global.Math, "random").mockReturnValueOnce(0.3);
    render(<App />);
    const moveButton = screen.getByText(/Move/i);

    // Move 10 times to win
    for (let i = 0; i < 10; i++) {
      fireEvent.click(moveButton);
    }

    expect(screen.getByText(/You reached the goal/i));

    // Reset game
    fireEvent.click(screen.getByText(/Play Again/i));

    // Verify progress reset
    progressBar = document.querySelector(".progressBar");
    expect(progressBar.style.width).toBe("0%");

    // Verify move button is visible after reset
    expect(screen.getByText(/Move/i));
  });
});
