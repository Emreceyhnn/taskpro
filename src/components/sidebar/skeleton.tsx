import { Skeleton } from "@mui/material";

const ListItemSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      animation="pulse"
      sx={{
        borderRadius: "8px",
        marginBlock: 1,
        marginInline: "auto",
      }}
      height={61}
      width={"90%"}
    />
  );
};

export default ListItemSkeleton;
