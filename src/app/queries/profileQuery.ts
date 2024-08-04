import { gql } from "@apollo/client";

export const GET_PROFILE_ID_QUERY = gql`
  query DefaultProfile($address: EvmAddress!) {
    defaultProfile(request: { for: $address }) {
      id
    }
  }
`;

export const PROFILE_QUERY = gql`
  query profile($request: ProfileRequest!) {
    profile(request: $request) {
      id
      signless
      ownedBy {
        address
      }
      followModule {
        ... on UnknownFollowModuleSettings {
          contract {
            address
            chainId
          }
        }
      }
      followNftAddress {
        address
        chainId
      }
      stats {
        followers
        following
        publications
      }
      handle {
        fullHandle
      }
      operations {
        id
        isFollowedByMe {
          value
          isFinalisedOnchain
        }
        canBlock
        canUnblock
        canFollow
        canUnfollow
      }
      metadata {
        displayName
        picture {
          ... on ImageSet {
            raw {
              uri
            }
          }
        }
      }
    }
  }
`;

export const EXPLORE_PROFILE_QUERY = gql`
  query ExploreProfiles {
    exploreProfiles(request: { orderBy: LATEST_CREATED }) {
      items {
        id
        signless
        followModule {
          ... on UnknownFollowModuleSettings {
            contract {
              address
              chainId
            }
          }
        }
        followNftAddress {
          address
          chainId
        }
        handle {
          fullHandle
          localName
        }
        ownedBy {
          address
        }
        stats {
          id
          followers
          following
        }
        operations {
          id
          isFollowedByMe {
            value
          }
        }
        metadata {
          displayName
          picture {
            ... on ImageSet {
              raw {
                uri
              }
            }
          }
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

const postFragment = gql`
  fragment CommonPost on Post {
    id
    metadata {
      ... on ImageMetadataV3 {
        id
        content
        asset {
          image {
            optimized {
              uri
            }
          }
        }
      }
      ... on TextOnlyMetadataV3 {
        id
        content
      }
    }
    createdAt
    stats {
      comments
      reactions
    }
    by {
      ownedBy {
        address
      }
      handle {
        fullHandle
      }
    }
  }
`;

export const EXPLORE_PUBLICATIONS_QUERY = gql`
  ${postFragment}
  query ExplorePublications {
    explorePublications(
      request: { orderBy: TOP_REACTED, where: { publicationTypes: [POST] } }
    ) {
      items {
        ...CommonPost
      }
    }
  }
`;

export const USER_PUBLICATIONS_QUERY = gql`
  ${postFragment}
  query UserPublications($id: ProfileId!) {
    publications(
      request: { where: { publicationTypes: [POST], from: [$id] } }
    ) {
      items {
        ...CommonPost
      }
    }
  }
`;