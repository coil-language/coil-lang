// Array
console.log(
  [{ status: "won" }, { status: "lost" }]
    ::map("status")
    ::map({ won: 10, lost: -10 })
    ::sum()
);

// Set
console.log(
  #{{ status: "won" }, { status: "lost" }}
    ::map("status")
    ::map({ won: 10, lost: -10 })
    ::sum()
);
