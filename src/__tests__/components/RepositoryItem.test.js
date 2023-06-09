import { RepositoryListContainer } from "../../components/RepositoryList";
import { screen, render } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      // repositoryName
      const repoName = screen.getAllByTestId("repositoryName");
      expect(repoName[0]).toHaveTextContent("jaredpalmer/formik");
      expect(repoName[1].props.children).toBe("async-library/react-async");
      // repositoryDescription
      const repoDescription = screen.getAllByTestId("repositoryDescription");
      expect(repoDescription[0]).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(repoDescription[1].props.children).toBe(
        "Flexible promise-based React data loader"
      );
      // repositoryLanguage
      const repoLanguage = screen.getAllByTestId("repositoryLanguage");
      expect(repoLanguage[0]).toHaveTextContent("TypeScript");
      expect(repoLanguage[1].props.children).toBe("JavaScript");
      // repositoryStarCount
      const repoStarCount = screen.getAllByTestId("repositoryStarCount");
      expect(repoStarCount[0].props.children).toBe("21k");
      expect(repoStarCount[1].props.children).toBe("1k");
      // repositoryForks
      const repoForks = screen.getAllByTestId("repositoryForks");
      expect(repoForks[0].props.children).toBe("1k");
      expect(repoForks[1].props.children).toBe(69);
      // repositoryReviews
      const repoReviews = screen.getAllByTestId("repositoryReviews");
      expect(repoReviews[0].props.children).toBe(3);
      expect(repoReviews[1].props.children).toBe(3);
      // repositoryRatingAverage
      const repoRatingAverage = screen.getAllByTestId(
        "repositoryRatingAverage"
      );
      expect(repoRatingAverage[0].props.children).toBe(88);
      expect(repoRatingAverage[1].props.children).toBe(72);
    });
  });
});
