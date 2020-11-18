// libs
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

// app code
import App from "../App";
import { getPokemonDetail } from "../api";

// mocks
import * as PokemonResponse from '../__mocks__/pokemon.json'
jest.mock('../api');

// test configs
expect.extend(toHaveNoViolations);

afterAll(() => {
  jest.clearAllMocks();
});

test("user can enter text into the input and see pokemon details", async () => {
  getPokemonDetail.mockResolvedValueOnce(PokemonResponse)

  // Arrange 
  const { getByTestId, queryByTestId } = render(<App />);
  const input = getByTestId("pokemon-search-input");
  const submitBtn = getByTestId("pokemon-submit-btn");
  let pokemonDetail = queryByTestId('pokemon-detail');

  // Act
  userEvent.type(input, "charizard");

  // Assert
  expect(pokemonDetail).toBeNull()

  userEvent.click(submitBtn);

  await waitFor(() => {
    let pokemonDetail = queryByTestId('pokemon-detail');

    expect(pokemonDetail).toBeInTheDocument();
    expect(pokemonDetail.textContent).toBe('charizard');
  });
});

test("the form is accessible", async () => {
  const { getByTestId } = render(<App />);
  const form = getByTestId("pokemon-search-form");
  const results = await axe(form);

  expect(results).toHaveNoViolations();
});


test("matches the snapshot", () => {
  const { getByTestId } = render(<App />);
  const form = getByTestId("pokemon-search-form");

  expect(form).toMatchInlineSnapshot(`
    <form
      data-testid="pokemon-search-form"
      title="pokemon-search-form"
    >
      <label
        for="pokemon-search-input"
      >
        Search for a Pokemon
      </label>
      <input
        data-testid="pokemon-search-input"
        id="pokemon-search-input"
        placeholder="search by name"
        type="text"
      />
      <button
        data-testid="pokemon-submit-btn"
      >
        Submit
      </button>
    </form>
  `);
});
