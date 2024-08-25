"use client";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, gql } from "@apollo/client";
import { DocumentNode } from "graphql";
import { graphql } from "../../gql";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
} from "@nextui-org/react";

// Types specific to the query
interface FundraisingNode {
  id: string;
  name: string;
  description: string;
}

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface FundraisingEdge {
  node: FundraisingNode;
}

interface FundraisingCollection {
  edges: FundraisingEdge[];
  pageInfo: PageInfo;
}

interface FundraisingQueryData {
  fundraisingCollection: FundraisingCollection;
}

interface FundraisingQueryVariables {
  cursor: string | null;
}

const allFundraisingQueryDocument: TypedDocumentNode<
  { fundraisingCollection: any }, // Replace `any` with your actual types
  { cursor: string | null }
> = gql`
  query AllFundraising($cursor: Cursor) {
    fundraisingCollection(first: 10, after: $cursor) {
      edges {
        node {
          id
          name
          description
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const FundraisingList = () => {
  const { data, fetchMore, loading, error } = useQuery(
    allFundraisingQueryDocument,
  );
  console.log("data", data);

  if (loading) return <Spinner color="primary" />; // Use a custom spinner component for better UI

  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {data?.fundraisingCollection?.edges.map(
          ({ node }: { node: FundraisingNode }) => (
            <Card key={node.id} title={node.name}>
              <CardHeader>{node.name}</CardHeader>
              <Divider />
              <CardBody>{node.description}</CardBody>
            </Card>
          ),
        )}
      </div>
      {data?.fundraisingCollection?.pageInfo.hasNextPage && (
        <Button
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data?.fundraisingCollection?.pageInfo.endCursor,
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

export default FundraisingList;
