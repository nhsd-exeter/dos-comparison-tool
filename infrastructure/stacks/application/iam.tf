resource "aws_iam_role" "kubernetes_service_account_role" {
  path        = "/"
  name        = var.kubernetes_service_account_role_name
  description = "Role for DoS Comparison Tool Kubernetes Service Account"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement" : [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated" : "arn:aws:iam::${var.aws_account_id}:oidc-provider/${trimprefix(data.terraform_remote_state.eks.outputs.eks_oidc_issuer_url, "https://")}"
        },
        "Action": ["sts:AssumeRoleWithWebIdentity","sts:AssumeRole"],
        "Condition": {
          "StringLike": {
            "${trimprefix(data.terraform_remote_state.eks.outputs.eks_oidc_issuer_url, "https://")}:sub": "system:serviceaccount:${var.project_id}*:${var.application_service_account_name}"
        }
      }
    }
  ]
}
EOF
}

resource "aws_iam_policy" "kubernetes_service_account_role_policy" {
  name        = var.kubernetes_service_account_role_policy_name
  path        = "/"
  description = "Policy for the Kubernetes service account role for the application to allow access to AWS services"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "kubernetes_service_account_role_policy_attachment" {
  role       = aws_iam_role.kubernetes_service_account_role.name
  policy_arn = aws_iam_policy.kubernetes_service_account_role_policy.arn
}
