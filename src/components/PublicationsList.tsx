"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { EXPLORE_PUBLICATIONS_QUERY } from "@/app/queries";
import { ImageMetadataV3, Post } from "@lens-protocol/react-web";
import { PublicationsListItem } from "./PublicationsListItem";

export function PublicationsList() {
  const { data, loading, error } = useQuery(EXPLORE_PUBLICATIONS_QUERY);
  const publications = data?.explorePublications;

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  if (!publications?.items) return <p>There no publications</p>;

  return (
    <div className="flex flex-col w-1/2 gap-3">
      <b>Latest Publications</b>
      {publications.items.map((item: Post) => (
        <PublicationsListItem item={item} />
      ))}
    </div>
  );
}
