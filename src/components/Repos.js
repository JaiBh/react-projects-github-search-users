import React from "react";
import styled from "styled-components";
import { useGithubContext } from "../context/context";
import { Pie2D, Bar2D, Doughnut2D, Column2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = useGithubContext();

  // get unique langa
  let allLanguages = githubRepos.map((repo) => repo.language);
  let languages = Array.from(new Set(allLanguages)).filter((item) => item);

  // top 5 used languages
  let mostUsedLanguagesData = languages
    .map((language) => {
      let count = allLanguages.filter((item) => item === language).length;
      return { label: language, value: count };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // top 5 rated repos
  let mostPopularRepos = githubRepos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => {
      return { label: repo.name, value: repo.stargazers_count };
    });

  // top 5 rated languages
  let popularLanguagesData = languages
    .map((language) => {
      let count = 0;
      githubRepos
        .filter((repo) => repo.language === language)
        .forEach((item) => (count += item.stargazers_count));
      return { label: language, value: count };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // top 5 forked repos
  let mostForkedData = githubRepos
    .sort((a, b) => b.forks - a.forks)
    .slice(0, 5)
    .map((repo) => {
      return { label: repo.name, value: repo.forks };
    });

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie2D data={mostUsedLanguagesData}></Pie2D>
        <Column2D data={mostPopularRepos}></Column2D>
        <Doughnut2D data={popularLanguagesData}></Doughnut2D>
        <Bar2D data={mostForkedData}></Bar2D>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
