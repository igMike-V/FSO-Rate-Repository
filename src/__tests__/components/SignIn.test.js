import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const mockOnSubmit = jest.fn();
      const testObject = { username: "user", password: "pass" };
      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const userNameElement = screen.getByPlaceholderText("Username");
      const passwordElement = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByText("Sign In");

      fireEvent.changeText(userNameElement, testObject.username);
      fireEvent.changeText(passwordElement, testObject.password);

      fireEvent.press(submitButton);

      await waitFor(() => {
        const [[submittedObject]] = mockOnSubmit.mock.calls;
        expect(submittedObject).toEqual(testObject);
      });
    });
  });
});
