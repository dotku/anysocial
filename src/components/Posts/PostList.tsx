"use client";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, gql } from "@apollo/client";
import { DocumentNode } from "graphql";
import { graphql } from "../../gql";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";
import moment from "moment";
import Identity from "fake-identity";

interface PostNode {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface PostEdge {
  node: PostNode;
}

interface PostCollection {
  edges: PostEdge[];
  pageInfo: PageInfo;
}

interface PostQueryData {
  fundraisingCollection: PostCollection;
}

interface PostQueryVariables {
  cursor: string | null;
}

const allPostQueryDocument: TypedDocumentNode<
  { postsCollection: any }, // Replace `any` with your actual types
  { cursor: string | null }
> = gql`
  query AllPosts($cursor: Cursor) {
    postsCollection(
      first: 10
      after: $cursor
      orderBy: { created_at: DescNullsLast }
    ) {
      edges {
        node {
          id
          content
          created_at
          updated_at
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const PostList = () => {
  const { data, fetchMore, loading, error } = useQuery(allPostQueryDocument);
  console.log("data", data);

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner color="primary" />
      </div>
    );

  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-3 mt-5">
        {data?.postsCollection?.edges.map(({ node }: { node: PostNode }) => (
          <Card key={node.id}>
            <CardBody>
              <div className="flex">
                <div className="pr-3">
                  <Avatar
                    src={`https://avatar.iran.liara.run/public?username=${Identity.generate().emailAddress}`}
                    name={Identity.generate().firstName}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <span className="text-large">
                      {Identity.generate().firstName}{" "}
                      {Identity.generate().lastName}
                    </span>
                    <span className="text-gray-500 ml-1 text-small">
                      {moment(node.created_at).fromNow()}
                    </span>
                  </div>
                  <div>{node.content}</div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {data?.postsCollection?.pageInfo.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data?.postsCollection?.pageInfo.endCursor,
              },
            });
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default PostList;
