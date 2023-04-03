resource "aws_security_group" "lambda_security_group" {
  #checkov:skip=CKV2_AWS_5:Attached outside of Terraform
  vpc_id      = data.aws_vpc.texas_vpc.id
  name        = var.security_group_name
  description = "Lambda Security Group"

  tags = {
    Name = var.security_group_name
  }
}

#tfsec:ignore:aws-vpc-no-public-egress-sgr
resource "aws_security_group_rule" "allow_https_out" {
  type              = "egress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lambda_security_group.id
  description       = "Allow all HTTPS outbound traffic"
}

#tfsec:ignore:aws-vpc-no-public-egress-sgr
resource "aws_security_group_rule" "allow_http_out" {
  type              = "egress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.lambda_security_group.id
  description       = "Allow all HTTP outbound traffic"
}
