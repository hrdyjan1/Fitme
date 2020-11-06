import React from 'react';

// const VERIFY = gql`
//   mutation verifyVoe($token: String!) {
//     verify(token: $token)
//   }
// `;

// function Verification({ token }) {
//   const { set, user: u } = useUserContext();
//   const [verify, { data }] = useMutation(VERIFY);

//   React.useEffect(() => {
//     verify({ variables: { token } })
//       .then((r) => {
//         if (r.data) {
//           console.log(r.data);
//         }
//         if (r.errors) {
//           console.log(r.errors);
//         }
//       })
//       .catch((e) => alert(e));
//   }, [token, verify]);

//   if (data?.verify) {
//     const newUser = { ...u, user: { ...u.user, verified: 1 } };
//     set(newUser);
//     localStorage.setItem('user', JSON.stringify(newUser));
//   }

//   return data?.verify ? <p>Overeno</p> : <p>Problem s overenim</p>;
// }

export function PageNotFound() {
//   const location = useLocation();

  //   const isVerToken = location.pathname.includes('verificationToken');
  //   if (isVerToken) {
  //     const token = location.pathname.match(/=(.+)/)[1];
  //     return <Verification token={token} />;
  //   }

  return (
    <div className="appWrapper">
      <h1>Error 404:</h1>
      <p>Page not found</p>
    </div>
  );
}
