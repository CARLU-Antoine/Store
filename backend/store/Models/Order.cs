
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
    }