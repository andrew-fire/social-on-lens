"use client";

import { Post } from "@lens-protocol/react-web";
import React from "react";

export function PublicationsListItem({ item }: { item: Post }) {
  return (
    <>
      {item.metadata.content && (
        <div className="p-3 px-5 border rounded-lg border-gray-300 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div>
              Created by:{" "}
              <a href={`/${item.by.ownedBy.address}`}>
                @{item.by.handle?.fullHandle}
              </a>
            </div>
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          {item.metadata.asset && (
            <img src={item.metadata.asset?.image?.optimized?.uri} width={200} />
          )}
          <p>{item.metadata.content}</p>
        </div>
      )}
    </>
  );
}
