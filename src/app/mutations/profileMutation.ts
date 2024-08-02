import { gql } from "@apollo/client";

export const SIGNLESS_MUTATION = gql`
  mutation {
    createChangeProfileManagersTypedData(request: { approveSignless: true }) {
      id
    }
  }
`;
